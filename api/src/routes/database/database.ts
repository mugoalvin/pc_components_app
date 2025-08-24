import express from 'express'
import sharedRequestsRouter from './shared_requests'

const databaseRouter = express.Router()
databaseRouter.use(express.json())

databaseRouter.use('/shared_requests', sharedRequestsRouter)

export default databaseRouter