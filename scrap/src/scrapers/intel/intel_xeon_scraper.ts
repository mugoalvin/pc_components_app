import dotenv from 'dotenv'
import { IntelXeonSeries, IntelXeonSeriesType } from '../../../../packages/types'
import { AppDataSource, initDatabase } from '../../db'
import { normalizeData } from '../../global/functions'
import { ProgressReporter } from '../../global/websocket/ProgressReporter'
import { saveIntelXeonProcessors } from '../../saveRecords/intel/xeon'
import { scrapeIntelXeonProcessors } from './intel_functions/intel_functions'

dotenv.config()
const { intel_website_domain, intel_ark_route } = process.env

export default async function runIntelXeon(series: IntelXeonSeries, seriesName: IntelXeonSeriesType): Promise<number> {
	const reporter = new ProgressReporter()
	reporter.report(101)

	AppDataSource.isInitialized || await initDatabase()

	const xeon_processors = await scrapeIntelXeonProcessors({
		domain: intel_website_domain!,
		route: intel_ark_route!
	}, series, seriesName)

	const processedXeonProcessors = normalizeData(xeon_processors)
	await saveIntelXeonProcessors(processedXeonProcessors)
	return processedXeonProcessors.length
}