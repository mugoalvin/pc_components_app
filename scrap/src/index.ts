import runRyzenScraper from "./scrapers/amd/amd_ryzen_scraper"
import runRadeonRxScraper from "./scrapers/amd/amd_radeon_scraper"
import { runIntelCoreIx } from "./scrapers/intel/intel_core_scraper"
import { runIntelUltra } from "./scrapers/intel/intel_ultra_scraper"
import { disconnectDatabase, initDatabase } from "./db"
import { runIntelArk } from "./scrapers/intel/intel_ark_scraper"


async function startScraping() {
	await initDatabase()
		.then(() => {
			// runIntelArk()
			// runIntelUltra()
			// runIntelCoreIx()
			// runRyzenScraper()
			// runRadeonRxScraper()
		})
}

async function stopScraping() {
	await disconnectDatabase()
}

startScraping()
// stopScraping()