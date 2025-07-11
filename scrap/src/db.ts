import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { handleError } from './global/functions'
import { RadeonEntity } from './entities/amd/radeon'
import { RyzenEntity } from "./entities/amd/ryzen"
import { CoreEntity } from "./entities/intel/core"
import { UltraEntity } from "./entities/intel/ultra"
import { ArkEntity } from './entities/intel/ark'
import { GeForce } from './entities/nvidia/geforce'


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
	entities: [RadeonEntity, RyzenEntity, CoreEntity, UltraEntity, ArkEntity, GeForce],
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