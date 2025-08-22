import axios from 'axios'
import Constants from 'expo-constants'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

type WebSocketContextType = {
	socket: WebSocket | null
	sendMessage: (msg: string) => void
	runTask: (
		endpoint: string,
		onProgress: (data: any) => void,
		body?: Record<string, any>
	) => Promise<void>
}


const WebSocketContext = createContext<WebSocketContextType>({
	socket: null,
	sendMessage: () => { },
	runTask: async () => { },
})


export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socketState, setSocketState] = useState<WebSocket | null>(null)
	const taskFinalizerRef = useRef<{ resolve: (v: any) => void; reject: (e: any) => void } | null>(null)
	const socketRef = useRef<WebSocket | null>(null)
	const progressCallbackRef = useRef<((data: any) => void) | null>(null)

	const runTask = (endpoint: string, onProgress: (data: any) => void, body?: Record<string, any>) => {
		return new Promise<void>(async (resolve, reject) => {
			progressCallbackRef.current = onProgress;
			taskFinalizerRef.current = { resolve, reject };
			try {
				await axios.post(`${apiDomain}${endpoint}`, body || {});
			} catch (err) {
				taskFinalizerRef.current = null;
				progressCallbackRef.current = null;
				reject(err);
			}
		});
	};


	useEffect(() => {
		let cleanup: (() => void) | undefined;

		(async () => {
			const serverDomain: string = (await axios.get(`${apiDomain}/websocket/start`)).data;
			const webSocketDomain = serverDomain.replace('http', 'ws');

			const socket = new WebSocket(webSocketDomain);
			socketRef.current = socket;
			setSocketState(socket);

			socket.onopen = () => console.log("✅ WebSocket connected");

			socket.onmessage = (event) => {
				console.log(event)

				let data: any = event.data;
				data = JSON.parse(event.data);

				// default: treat as progress
				progressCallbackRef.current?.(data);
			};

			socket.onclose = () => {
				console.log("❌ WebSocket closed");
				taskFinalizerRef.current?.reject(new Error('WebSocket closed'));
				taskFinalizerRef.current = null;
				progressCallbackRef.current = null;
				setSocketState(null);
			};

			cleanup = () => socket.close();
		})();

		return () => { cleanup?.(); };
	}, []);



	const sendMessage = (msg: string) => {
		if (socketRef.current?.readyState === WebSocket.OPEN) {
			socketRef.current.send(msg);
		}
	};

	return (
		<WebSocketContext.Provider value={{ socket: socketState, sendMessage, runTask }}>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => useContext(WebSocketContext);