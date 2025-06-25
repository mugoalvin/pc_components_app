import express from 'express'
import processorRouter from './processors.js'

const databaseRouter = express.Router()
databaseRouter.use(express.json())

databaseRouter.use('/processors', processorRouter)

export default databaseRouter