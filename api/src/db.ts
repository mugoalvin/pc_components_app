import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()
const { HOST, USERNAME, PORT, PASSWORD, DATABASE_NAME, NODE_ENV } = process.env
const isDevelopment = NODE_ENV == 'development'

export const ApiDataSource = new DataSource({
	type: "mysql",
	host: HOST,
	port: Number(PORT),
	username: USERNAME,
	password: PASSWORD || '',
	database: DATABASE_NAME,
	synchronize: isDevelopment
})

export async function initApiDatabase() {
	await ApiDataSource.initialize()
		.catch(error => {
			throw error
		})
}	


export async function disconnectApiDatabase() {
	await ApiDataSource.destroy()
		.catch(err => {
			throw err
		})
}