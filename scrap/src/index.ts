import runRyzenScraper from "./scrapers/amd/amd_ryzen_scraper"
import runRadeonRxScraper from "./scrapers/amd/amd_radeon_scraper"
import { runIntelScraper } from "./scrapers/intel/intel_core_scraper"
import { initDatabase } from "./db"


async function startScraping() {
	await initDatabase()
		.then(() => {
			runIntelScraper()
		})
}

startScraping()


// runRyzenScraper()
// runRadeonRxScraper()