import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

import scrapeRouter from './routes/scrape.routes'
import databaseRouter from './routes/database.routes'


dotenv.config()

const app = express()
const { SERVER_PORT } = process.env

app.use(cors())
app.use(express.json())
app.use('/scrape', scrapeRouter)
app.use('/database', databaseRouter)

app.listen(SERVER_PORT, () => {
	console.log(`Server is running on port ${SERVER_PORT}`)
})