import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import axios from 'axios'
import router from './routes/root.js'
import scrapeRouter from './routes/scrape.js'

dotenv.config()
const { API_PORT } = process.env

const app = express()

app.use(cors())
app.use('/', router)
app.use('/scrape', scrapeRouter)

app.listen(API_PORT, () => {
	console.log(`Api runnning on port ${API_PORT}`)
})

process.on("SIGINT", async () => {
	try {
		await axios.post("/disconnect")
	}
	catch (err: any) {
		console.error(err.message || "Failed to disconnect database before exiting!")
	}
	process.exit()
})