import express from 'express'
import { ApiDataSource, initApiDatabase } from '../../db.js'

const processorRouter = express.Router()
processorRouter.use(express.json())


processorRouter.post('/getCount', async function (req, res) {
	const table = req.body.table
	!ApiDataSource.isInitialized && await initApiDatabase()
	const result = await ApiDataSource.query(`SELECT COUNT(*) AS count FROM ${ table }`)
	res.send(result[0].count)
})


processorRouter.post('/getData', async function (req, res) {
	const table = req.body.table
	!ApiDataSource.isInitialized && await initApiDatabase()

	const tableData = await ApiDataSource.query(`SELECT * FROM ${ table }`)
	res.send(tableData)
})


processorRouter.post('/getDistinct', async function (req, res) {
	const { table, column } = req.body
	!ApiDataSource.isInitialized && await initApiDatabase()

	const tableData = await ApiDataSource.query(`SELECT * FROM ${ table }`)
	res.send(tableData)
})


export default processorRouter