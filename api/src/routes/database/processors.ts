import express from 'express'

const processorRouter = express.Router()
processorRouter.use(express.json())

export default processorRouter