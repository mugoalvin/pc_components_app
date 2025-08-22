import dotenv from 'dotenv';
import { IntelCoreScrapingOptions } from "../../../../packages/types";
import { AppDataSource, initDatabase } from '../../db';
import { normalizeData } from '../../global/functions';
import { ProgressReporter } from '../../global/websocket/ProgressReporter';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';
import { scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env

export default async function runIntelCoreIx(desiredIntelProcessorsToScrape: IntelCoreScrapingOptions) {
	const reporter = new ProgressReporter()
	reporter.report(101)

	AppDataSource.isInitialized || await initDatabase()

	const intel_core_processors = await scrapeIntelCoreIxProcessors({
		domain: intel_website_domain || '',
		route: intel_ark_route || ''
	}, desiredIntelProcessorsToScrape)

	const processedCoreIx = normalizeData(intel_core_processors)
	await saveIntelCoreIxProcessors(processedCoreIx)
}