import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';


import { fetchAmdRyzenProcessors, validateRyzenProcessors } from "./amd_functions/ryzen_functions"
import { saveRyzenProcessors } from '../../saveRecords/amd/ryzen'
import { normalizeData } from '../../global/functions'
import { AmdDevice, AmdScrape, RyzenDesktopSeries, RyzenLaptopSeries } from './types'

dotenv.config()
const { amd_website_domain, amd_desktop_prosessors_route, amd_laptop_processors_route } = process.env

async function runRyzenScraper() {
	const isLaptopProcessors = AmdDevice.Desktop
	const amd_ryzen_processors = await fetchAmdRyzenProcessors({
		domain: amd_website_domain || '',
		route: (
			isLaptopProcessors
				? amd_laptop_processors_route
				: amd_desktop_prosessors_route
		) || "",
		tabIndex: AmdScrape.Ryzen
	}, RyzenDesktopSeries.Series9000)

	const processedRyzenProcessors = normalizeData(amd_ryzen_processors)
	const validatedRyzenprocessors = validateRyzenProcessors(processedRyzenProcessors)
	saveRyzenProcessors(validatedRyzenprocessors)
}

export default runRyzenScraper