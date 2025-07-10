import dotenv from 'dotenv'
import { AppDataSource, initDatabase } from "../../db";
import { handleError, normalizeData } from "../../global/functions"
import { scrapeNvidiaGpu } from './nvidia_functions/geforce'
import { NvidiaGeforceSeries } from '../../../../packages/types';
import { NvidiaGeForce } from '@packages/interfaces';
import { saveNvidiaGeForceGraphics } from '../../saveRecords/nvidia/geforce';

dotenv.config()
const { nvidia_website_domain, nvidia_geforce_route } = process.env

export default async function runNvidiaGeforce(nvidiaSeries: NvidiaGeforceSeries) {

	try {
		AppDataSource.isInitialized || await initDatabase()
		const nvidia_geforce_graphics = await scrapeNvidiaGpu({
			domain: nvidia_website_domain || '',
			route: nvidia_geforce_route || ''
		}, nvidiaSeries)

		const processedGeforce = normalizeData(nvidia_geforce_graphics) as Partial<NvidiaGeForce[]>
		await saveNvidiaGeForceGraphics(processedGeforce)
		return nvidia_geforce_graphics.length
	}
	catch(error: any) {
		handleError(error)
	}
}