import dotenv from "dotenv"
import { scrapeIntelArkGpu } from "./intel_functions/ark";
import { IntelArk, IntelGraphicsScrapingOptions } from "./types";
import { normalizeData, readJsonFromFile } from "../../global/functions";
import { saveIntelArkGraphics } from "../../saveRecords/intel/ark";
import { AppDataSource, initDatabase } from "../../db";

dotenv.config()
const { intel_website_domain, intel_ark_route } = process.env


export async function runIntelArk(desiredGraphicsToScrape: IntelGraphicsScrapingOptions): Promise<void> {
	AppDataSource.isInitialized || await initDatabase()

	const intel_ark_graphics = await scrapeIntelArkGpu({
		domain: intel_website_domain || "",
		route: intel_ark_route || ""
	}, desiredGraphicsToScrape)

	const processedArk = normalizeData(intel_ark_graphics) as Partial<IntelArk[]>
	await saveIntelArkGraphics(processedArk)
}