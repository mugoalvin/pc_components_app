import dotenv from "dotenv";

import { IntelArk } from "../../../../packages/interfaces";
import { IntelGraphicsScrapingOptions } from "../../../../packages/types";
import { AppDataSource, initDatabase } from "../../db";
import { handleError, normalizeData } from "../../global/functions";
import { ProgressReporter } from '../../global/websocket/ProgressReporter';
import { saveIntelArkGraphics } from "../../saveRecords/intel/ark";
import { scrapeIntelArkGpu } from "./intel_functions/ark";

dotenv.config()
const { intel_website_domain, intel_ark_route } = process.env


export default async function runIntelArk(desiredGraphicsToScrape: IntelGraphicsScrapingOptions): Promise<number> {
	try {
		const reporter = new ProgressReporter()
		reporter.report(101)

		AppDataSource.isInitialized || await initDatabase()

		const intel_ark_graphics = await scrapeIntelArkGpu({
			domain: intel_website_domain || "",
			route: intel_ark_route || ""
		}, desiredGraphicsToScrape)

		const processedArk = normalizeData(intel_ark_graphics) as Partial<IntelArk[]>
		await saveIntelArkGraphics(processedArk)
		return processedArk.length
	}
	catch (error) {
		handleError(error)
	}
}