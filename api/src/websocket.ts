import axios from 'axios'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const { SERVER_DOMAIN } = process.env
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