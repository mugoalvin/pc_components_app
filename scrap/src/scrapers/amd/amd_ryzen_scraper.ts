import dotenv from 'dotenv'

import { fetchAmdRyzenProcessors, validateRyzenProcessors } from "./amd_functions/ryzen_functions"
import { saveRyzenProcessors } from '../../saveRecords/amd/ryzen'
import { handleError, normalizeData } from '../../global/functions'
import { AmdScrape, RyzenDesktopSeries, RyzenLaptopSeries } from '../../../../packages/types'
import { AppDataSource, initDatabase } from '../../db'

dotenv.config()
const { amd_website_domain, amd_desktop_prosessors_route, amd_laptop_processors_route } = process.env

async function runRyzenScraper(isLaptopProcessors: number, serie?: RyzenDesktopSeries | RyzenLaptopSeries) {
	try {

		AppDataSource.isInitialized || initDatabase()

		const amd_ryzen_processors = await fetchAmdRyzenProcessors({
			domain: amd_website_domain || '',
			route: (
				isLaptopProcessors
					? amd_laptop_processors_route
					: amd_desktop_prosessors_route
			) || "",
			tabIndex: AmdScrape.Ryzen
		}, serie)

		const deviceType = Boolean(isLaptopProcessors) ? "Laptop" : "Desktop"
		const amd_ryzen_processors_with_device = amd_ryzen_processors.map((proc: any) => ({
			...proc,
			device: deviceType
		}))

		const processedRyzenProcessors = normalizeData(amd_ryzen_processors_with_device)
		const validatedRyzenprocessors = validateRyzenProcessors(processedRyzenProcessors)
		await saveRyzenProcessors(validatedRyzenprocessors)
	}
	catch (error: any) {
		handleError(error)
	}
}

export default runRyzenScraper