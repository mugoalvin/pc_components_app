import axios from 'axios'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const { SERVER_DOMAIN, WEBSOCKET_SERVER_DOMAIN } = process.env
const webSocketRouter = express.Router()

webSocketRouter.get("/start", async (req, res) => {
	try {
		const webSocketResponce = await axios.get(`${SERVER_DOMAIN}/websocket/getServerDomain`)
		res.send(webSocketResponce.data)
	} catch (error: any) {
		res.send(error.errorMsg || error.message || "Failed to forward websocket request")
	}
})

export default webSocketRouter