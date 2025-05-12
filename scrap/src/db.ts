import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

import { handleError } from './global/functions'
import { AmdRadeon } from './entities/amd/radeon'
import { AmdRyzen } from "./entities/amd/ryzen"
import { IntelCoreIx } from "./entities/intel/core"
import { IntelUltra } from "./entities/intel/ultra"

dotenv.config()
const {HOST, USERNAME, PORT, PASSWORD, DATABASE_NAME, NODE_ENV } = process.env
const isDevelopment = NODE_ENV == 'development'

export const AppDataSource = new DataSource({
	type: "mysql",
    host: HOST,
	port: Number(PORT),
    username: USERNAME,
	password: PASSWORD || '',
	database: DATABASE_NAME,
	entities: [ AmdRadeon, AmdRyzen, IntelCoreIx, IntelUltra ],
	synchronize: isDevelopment
})


export const initDatabase = async () => {
	await AppDataSource.initialize()
		.then(() => {
			console.log("Connection to the database was successful!\nSyncronized tables.\n")
		})
		.catch(error => {
			handleError(error)
		})
}