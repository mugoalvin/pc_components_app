import axios from "axios"
import dotenv from 'dotenv'
import express from "express"

dotenv.config()
const { SERVER_DOMAIN } = process.env
const router = express.Router()

router.post("/connect", async (_, res) => {
	try {
		await axios.post(`${SERVER_DOMAIN}/database/connect`)
		res.send("Success")
	}
	catch (error: any) {
		res.send(error.errorMsg || "Failed to connect to the database!")
	}
})

export default router