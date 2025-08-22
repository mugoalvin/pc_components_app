import dotenv from 'dotenv';
import { scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';
import { normalizeData } from '../../global/functions';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';
import { IntelCoreScrapingOptions } from "../../../../packages/types";
import { AppDataSource, initDatabase } from '../../db';
import { ProgressReporter } from '../../global/websocket/ProgressReporter';

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