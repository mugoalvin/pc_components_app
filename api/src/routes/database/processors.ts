import { DatabaseTables } from '@packages/types.js'
import express from 'express'
import { ApiDataSource, entityMap, initApiDatabase } from '../../db'

const processorRouter = express.Router()
processorRouter.use(express.json())


processorRouter.post('/getCount', async function (req, res) {
	const table: DatabaseTables = req.body.table
	const classEntity = entityMap[table]

	!ApiDataSource.isInitialized && await initApiDatabase()
	const entityRepo = ApiDataSource.getRepository(classEntity)

	const result = await entityRepo.count()

	res.send(result)
})


processorRouter.post('/getData', async function (req, res) {
	const table: DatabaseTables = req.body.table
	const entityClass = entityMap[table]

	!ApiDataSource.isInitialized && await initApiDatabase()

	const entiryRepo = ApiDataSource.getRepository(entityClass);
	const tableData = await entiryRepo.find();

	res.send(tableData)
})


processorRouter.post('/getDistinct', async function (req, res) {
	const { table, column } = req.body
	!ApiDataSource.isInitialized && await initApiDatabase()
	const entityClass = entityMap[table as DatabaseTables]

	const repo = ApiDataSource.getRepository(entityClass)

	const distinctValues = repo
		.createQueryBuilder(table)
		.select(`DISTINCT ${table}.${column}`)
		.getMany()

	res.send(distinctValues)
})


export default processorRouter