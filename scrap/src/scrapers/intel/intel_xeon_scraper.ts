import dotenv from 'dotenv'
import { AppDataSource, initDatabase } from '../../db'
import { scrapeIntelXeonProcessors } from './intel_functions/intel_functions'
import { XeonSeries } from '../../../../packages/types'
import { normalizeData } from '../../global/functions'
import { saveIntelXeonProcessors } from '../../saveRecords/intel/xeon'

dotenv.config()
const { intel_website_domain, intel_ark_route } = process.env

export default async function runIntelXeon(series: XeonSeries): Promise<number> {
	AppDataSource.isInitialized || await initDatabase()

	const xeon_processors = await scrapeIntelXeonProcessors({
		domain: intel_website_domain!,
		route: intel_ark_route!
	}, series)

	const processedXeonProcessors = normalizeData(xeon_processors)
	await saveIntelXeonProcessors(processedXeonProcessors)
	return processedXeonProcessors.length
}