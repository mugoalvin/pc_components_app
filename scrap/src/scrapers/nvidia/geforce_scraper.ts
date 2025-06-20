import dotenv from 'dotenv'
import { AppDataSource, initDatabase } from "../../db";
import { throwError, normalizeData } from "../../global/functions"
import { scrapeNvidiaGpu } from './nvidia_functions/geforce'
import { NvidiaGeforceSeries } from '../../../../packages/types';

dotenv.config()
const { nvidia_website_domain, nvidia_geforce_route } = process.env

export async function runNvidiaGeforce() {
	try {
		AppDataSource.isInitialized || await initDatabase()
		const nvidia_geforce_graphics = await scrapeNvidiaGpu({
			domain: nvidia_website_domain || '',
			route: nvidia_geforce_route || ''
		}, NvidiaGeforceSeries.Series50)

		console.log(nvidia_geforce_graphics)
		return nvidia_geforce_graphics
		// const processedGeforce = normalizeData(nvidia_geforce_graphics)
	}
	catch(error) {
		console.error(error)
		throwError(error)
	}
}