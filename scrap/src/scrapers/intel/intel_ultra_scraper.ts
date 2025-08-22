import dotenv from 'dotenv'
import { normalizeData } from "../../global/functions"
import { saveIntelUltraProcessors } from "../../saveRecords/intel/ultra"
import { scrapeIntelCoreUltraProcessors } from "./intel_functions/intel_functions"
import { IntelUltraSeries } from "../../../../packages/types";
import { AppDataSource, initDatabase } from '../../db';
import { ProgressReporter } from '../../global/websocket/ProgressReporter';

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env;

export default async function runIntelUltra(serie?: IntelUltraSeries) {
	const reporter = new ProgressReporter()
	reporter.report(101)
	
	AppDataSource.isInitialized || await initDatabase()

	const ultra_processors = await scrapeIntelCoreUltraProcessors({
		domain: intel_website_domain || '',
		route: intel_ark_route || ''
	}, serie)

	const processedUltraProcessors = normalizeData(ultra_processors)
	await saveIntelUltraProcessors(processedUltraProcessors)
}