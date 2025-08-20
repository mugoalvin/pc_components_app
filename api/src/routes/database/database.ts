import express from 'express'
import processorRouter from './processors'

const databaseRouter = express.Router()
databaseRouter.use(express.json())

databaseRouter.use('/processors', processorRouter)

export default databaseRouter