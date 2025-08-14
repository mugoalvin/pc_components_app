import axios from "axios";
import dotenv from "dotenv"
import express, { Request, Response } from "express";

dotenv.config()
const { SERVER_DOMAIN } = process.env

const scrapeRouter = express.Router()
scrapeRouter.use(express.json())

async function sendPostRequest(req: Request, res: Response, url: string) {
	try {
		const serverResponse = await axios.post(`${SERVER_DOMAIN}${url}`, req.body)
		res.json(serverResponse.data)
	}
	catch (err: any) {
		const status = err.response?.status || 500
		res.status(status).json({ errorMsg: err.response?.data?.errorMsg || err.message })
	}
}


scrapeRouter.post('/ark', async function (req, res) {
	sendPostRequest(req, res, "/scrape/intel_ark")
})

scrapeRouter.post('/ultra', async function (req, res) {
	sendPostRequest(req, res, "/scrape/intel_ultra")
})

scrapeRouter.post('/core', async function (req, res) {
	sendPostRequest(req, res, "/scrape/intel_core")
})

scrapeRouter.post('/xeon', async function (req, res) {
	sendPostRequest(req, res, "/scrape/intel_xeon")
})

scrapeRouter.post('/ryzen', async function (req, res) {
	sendPostRequest(req, res, "/scrape/amd_ryzen")
})

scrapeRouter.post('/radeon', async function (req, res) {
	sendPostRequest(req, res, "/scrape/amd_radeon")
})

scrapeRouter.post('/geforce', async function (req, res) {
	sendPostRequest(req, res, "/scrape/geforce")
})

export default scrapeRouter