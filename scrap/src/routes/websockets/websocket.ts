import express from 'express'
import dotenv from 'dotenv'
import os from 'os'

dotenv.config()

const { SERVER_PORT } = process.env
const webSocketRouter = express.Router()

webSocketRouter.get("/getServerDomain", (req, res) => {
	try {
		const interfaces = os.networkInterfaces();
		for (let name in interfaces) {
			for (let iface of interfaces[name]!) {
				if (iface.family === "IPv4" && !iface.internal) {
					res.send(`http://${iface.address}:${SERVER_PORT}`)
				}
			}
		}
	} catch (error: any) {
		res.send(error.message || "Error getting server domain")
	}
})

export default webSocketRouter