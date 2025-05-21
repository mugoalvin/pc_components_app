import dotenv from 'dotenv';
import { scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';
import { normalizeData, readJsonFromFile } from '../../global/functions';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';
import { IntelCoreScrapingOptions } from './types';
import { AppDataSource, initDatabase } from '../../db';

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env

export async function runIntelCoreIx(desiredIntelProcessoesToScrape: IntelCoreScrapingOptions) {
	AppDataSource.isInitialized || await initDatabase()
	
	const intel_core_processors = await scrapeIntelCoreIxProcessors({
	    domain: intel_website_domain || '',
	    route: intel_ark_route || ''
	}, desiredIntelProcessoesToScrape)

	const processedCoreIx = normalizeData(intel_core_processors)
	await saveIntelCoreIxProcessors(processedCoreIx)
}