import dotenv from "dotenv"
import { scrapeIntelArkGpu } from "./intel_functions/ark";
import { ArkSeries, IntelGraphics, IntelGraphicsScrapingOptions } from "./types";
import { normalizeData } from "../../global/functions";
import { saveIntelArkGraphics } from "../../saveRecords/intel/ark";

dotenv.config()
const { intel_website_domain, intel_ark_route } = process.env


export async function runIntelArk() {
	const desiredGraphicsToScrape: IntelGraphicsScrapingOptions = {
		family: IntelGraphics.Ark,
		series: ArkSeries.B_Series
	}

	const intel_ark_graphics = await scrapeIntelArkGpu({
		domain: intel_website_domain || "",
		route: intel_ark_route || ""
	}, desiredGraphicsToScrape)

	
	const processedArk = normalizeData(intel_ark_graphics)
	saveIntelArkGraphics(processedArk)
}