import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { v4 as uuidV4 } from 'uuid'
import { WebSocketServer } from 'ws'

import scrapeRouter from './routes/scrape.routes'
import databaseRouter from './routes/database.routes'
import webSocketRouter from './routes/websockets/websocket'

dotenv.config()

const app = express()
const { SERVER_PORT } = process.env

app.use(cors())
app.use(express.json())
app.use('/scrape', scrapeRouter)
app.use('/database', databaseRouter)
app.use('/websocket', webSocketRouter)

const clients = new Map<string, any>()

const server = app.listen(SERVER_PORT, () => {
	console.log(`Server is running on port ${SERVER_PORT}`)
})

const wss = new WebSocketServer({ server })

wss.on("connection", (ws) => {
	const clientId = uuidV4()
	clients.set(clientId, { ws, registeredTasks: new Set() })

	ws.on("message", (message) => {
		let i = 0
		const interval = setInterval(() => {
			ws.send(i)
			i++
			if (i > 100) {
				clearInterval(interval) // stop when done
			}
		}, 100)
	})
})

export function broadcastMessageToClient(message: {}) {
	wss.clients.forEach(client => {
		if (client.readyState == 1) {
			client.send(JSON.stringify(message))
		}
	})
}