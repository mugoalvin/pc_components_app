import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { throwError } from './global/functions'
import { RadeonEntity } from './entities/amd/radeon'
import { RyzenEntity } from "./entities/amd/ryzen"
import { CoreEntity } from "./entities/intel/core"
import { UltraEntity } from "./entities/intel/ultra"
import { ArkEntity } from './entities/intel/ark'


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
	entities: [RadeonEntity, RyzenEntity, CoreEntity, UltraEntity, ArkEntity],
	synchronize: isDevelopment
})

export async function initDatabase() {
	await AppDataSource.initialize()
		.catch(error => {
			throwError(error)
		})
}	

export async function reconnectDatabase() {
	AppDataSource.isInitialized || await initDatabase()
}

export async function disConnectDatabase() {
	await AppDataSource.destroy()
		.catch(err => {
			throwError(err)
		})
}