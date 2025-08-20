import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { handleError } from './global/functions'
import { ArkEntity, CoreEntity, GeForceEntity, RadeonEntity, RyzenEntity, UltraEntity, XeonEntity } from "@pc/entities/src"


dotenv.config()
const { HOST, USERNAME, PORT, PASSWORD, DATABASE_NAME, NODE_ENV } = process.env
const isDevelopment = NODE_ENV == 'development'

export const AppDataSource = new DataSource({
	type: "mysql",
	host: HOST,
	port: Number(PORT),
	username: USERNAME,
	password: PASSWORD || '',
	database: DATABASE_NAME,
	entities: [RadeonEntity, RyzenEntity, CoreEntity, UltraEntity, ArkEntity, XeonEntity, GeForceEntity],
	synchronize: isDevelopment
})

export async function initDatabase() {
	await AppDataSource.initialize()
		.catch(error => {
			handleError(error)
		})
}	


export async function disConnectDatabase() {
	await AppDataSource.destroy()
		.catch(err => {
			handleError(err)
		})
}