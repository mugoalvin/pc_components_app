import dotenv from 'dotenv';
import { scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';
import { normalizeData } from '../../global/functions';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';
import { IntelCoreScrapingOptions } from './types';

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env

export async function runIntelCoreIx() {
	const desiredIntelProcessoesToScrape: IntelCoreScrapingOptions = {
		tier: 'i9',
		generation: 14
	}

	const intel_core_processors = await scrapeIntelCoreIxProcessors({
	    domain: intel_website_domain || '',
	    route: intel_ark_route || ''
	}, desiredIntelProcessoesToScrape)

	const processedCoreIx = normalizeData(intel_core_processors)
	saveIntelCoreIxProcessors(processedCoreIx)
}