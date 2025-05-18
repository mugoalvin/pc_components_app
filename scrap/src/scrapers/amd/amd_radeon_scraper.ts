import dotenv from 'dotenv'

import { getAmdRadeonRx, validateRadeonRxProcessors } from './amd_functions/radeon_rx_functions'
import { normalizeData } from '../../global/functions'
import { saveRadeonCards } from '../../saveRecords/amd/radeon'
import { AmdScrape, RadeonSeries } from './types'

dotenv.config()

const { amd_website_domain, amd_radeon_rx_graphics_card_route } = process.env

async function runRadeonRxScraper() {
	const amd_graphics_cards = await getAmdRadeonRx({
		domain: amd_website_domain || '',
		route: amd_radeon_rx_graphics_card_route || '',
		tabIndex: AmdScrape.Radeon
	}, RadeonSeries.Series9000)

	const normalizedAmdGraphicsCards = normalizeData(amd_graphics_cards)
	const validatedRadeonRxCards =  validateRadeonRxProcessors(normalizedAmdGraphicsCards)
	saveRadeonCards(validatedRadeonRxCards)
}

export default runRadeonRxScraper