import { ArkEntity, CoreEntity, GeForceEntity, RadeonEntity, RyzenEntity, UltraEntity, XeonEntity } from "@pc/entities"
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { DatabaseTables } from '../../packages/types'

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
	entities: [ArkEntity, CoreEntity, GeForceEntity, RadeonEntity, RyzenEntity, UltraEntity, XeonEntity],
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

export const entityMap: Record<DatabaseTables, any> = {
	ark: ArkEntity,
	core: CoreEntity,
	geforce: GeForceEntity,
	radeon: RadeonEntity,
	ryzen: RyzenEntity,
	ultra: UltraEntity,
	xeon: XeonEntity
}