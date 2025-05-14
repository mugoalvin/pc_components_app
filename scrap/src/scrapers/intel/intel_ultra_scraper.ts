import dotenv from 'dotenv'
import { normalizeData } from "../../global/functions"
import { saveIntelUltraProcessors } from "../../saveRecords/intel/ultra"
import { scrapeIntelCoreUltraProcessors } from "./intel_functions/intel_functions"

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env;

export async function runIntelUltra() {
	const ultra_processors = await scrapeIntelCoreUltraProcessors({
		domain: intel_website_domain || '',
		route: intel_ark_route || ''
	})

	const processedUltraProcessors = normalizeData(ultra_processors)
	saveIntelUltraProcessors(processedUltraProcessors)
}