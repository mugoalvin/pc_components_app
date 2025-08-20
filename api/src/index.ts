import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import router from './routes/root'
import scrapeRouter from './routes/scrape'
import databaseRouter from './routes/database/database'

dotenv.config()
const { API_PORT } = process.env

const app = express()

app.use(cors())
app.use('/', router)
app.use('/scrape', scrapeRouter)
app.use('/database', databaseRouter)

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