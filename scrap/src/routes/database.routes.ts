import express from 'express'
import { disConnectDatabase, initDatabase } from '../db'

const databaseRouter = express.Router()

databaseRouter.post('/connect', async (_, res) => {
	await initDatabase()
		.then(() => res.status(200).send("Database connection successful"))
		.catch(error => res.status(500).json({error: error.message}))
})

databaseRouter.post('/disconnect', async (_, res) => {
	await disConnectDatabase()
		.then(() => res.status(200).send("Database successfully disconnected!"))
		.catch(error => res.status(500).json({error: error.message}))
})



export default databaseRouter