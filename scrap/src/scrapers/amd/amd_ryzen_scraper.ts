import dotenv from 'dotenv'

import { fetchAmdRyzenProcessors, validateRyzenProcessors } from "./amd_functions/ryzen_functions"
import { saveRyzenProcessors } from '../../saveRecords/amd/ryzen'
import { normalizeData } from '../../global/functions'

dotenv.config()
const { amd_website_domain, amd_desktop_prosessors_route } = process.env


async function runRyzenScraper() {
	const amd_ryzen_processors = await fetchAmdRyzenProcessors({
		domain: amd_website_domain || '',
		route: amd_desktop_prosessors_route || '',
		tabIndex: 1
	})

	const processedRyzenProcessors = normalizeData(amd_ryzen_processors)
	const validatedRyzenprocessors = validateRyzenProcessors(processedRyzenProcessors)

	saveRyzenProcessors(validatedRyzenprocessors)
}

export default runRyzenScraper