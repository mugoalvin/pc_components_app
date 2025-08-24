import { DatabaseTables } from '@packages/types'
import express from 'express'
import { ApiDataSource, entityMap, initApiDatabase } from '../../db'

const sharedRequestsRouter = express.Router()
sharedRequestsRouter.use(express.json())

sharedRequestsRouter.post('/getCount', async function (req, res) {
	const table: DatabaseTables = req.body.table
	const classEntity = entityMap[table]

	!ApiDataSource.isInitialized && await initApiDatabase()
	const entityRepo = ApiDataSource.getRepository(classEntity)

	const result = await entityRepo.count()

	res.send(result)
})


sharedRequestsRouter.post('/getData', async function (req, res) {
	const table: DatabaseTables = req.body.table
	const entityClass = entityMap[table]

	!ApiDataSource.isInitialized && await initApiDatabase()

	const entiryRepo = ApiDataSource.getRepository(entityClass);
	const tableData = await entiryRepo.find();

	res.send(tableData)
})


sharedRequestsRouter.post('/getDistinct', async function (req, res) {
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

sharedRequestsRouter.post('/getLatest', async function (req, res) {
	const { table, numberOfProducts } = req.body;
	!ApiDataSource.isInitialized && await initApiDatabase()
	const entityClass = entityMap[table as DatabaseTables]

	const repo = ApiDataSource.getRepository(entityClass)
	const products = await repo
		.createQueryBuilder(table)
		.orderBy(`${table}.created_at`, "DESC")
		.limit(numberOfProducts)
		.getMany()
	
	res.send(products)
})

export default sharedRequestsRouter