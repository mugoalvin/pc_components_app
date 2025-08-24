import axios from 'axios'
import Constants from 'expo-constants'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

type WebSocketContextType = {
	socket: WebSocket | null
	connectWebSocket: () => Promise<WebSocket>
	sendMessage: (msg: string) => void
}


const WebSocketContext = createContext<WebSocketContextType>({
	socket: null,
	connectWebSocket: async () => { throw new Error("WebSocketProvider not mounted") },
	sendMessage: () => { },
})

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	let reconnectTimeout: NodeJS.Timeout
	const [socketState, setSocketState] = useState<WebSocket | null>(null)
	const socketRef = useRef<WebSocket | null>(null)
	const progressCallbackRef = useRef<((data: any) => void) | null>(null)


	const connectWebSocket = useCallback(async () => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			return socketRef.current
		}

		try {
			const serverDomain: string = (await axios.get(`${apiDomain}/websocket/start`)).data
			const webSocketDomain = serverDomain.replace('http', 'ws')

			const socket = new WebSocket(webSocketDomain)
			socketRef.current = socket
			setSocketState(socket)

			socket.onopen = () => console.log("✅ WebSocket connected")
			socket.onmessage = (event) => {
				let data: any = event.data
				console.log(data.progress)
				try { data = JSON.parse(event.data) } catch { }
				progressCallbackRef.current?.(data)
			}

			socket.onclose = () => {
				console.log("❌ WebSocket closed")
				setSocketState(null)
				socketRef.current = null
			}

			socket.onerror = () => {
				console.log("Websocket error:")
				socket.close()
			}

			return socket
		} catch (err) {
			console.error("Failed to connect WebSocket:", err)
			throw err
		}
	}, [])

	const sendMessage = (msg: string) => {
		if (socketRef.current?.readyState === WebSocket.OPEN) {
			socketRef.current.send(msg);
		}
	}

	useEffect(() => {
		connectWebSocket()
	}, [])

	return (
		<WebSocketContext.Provider value={{ socket: socketState, connectWebSocket, sendMessage }}>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => useContext(WebSocketContext);