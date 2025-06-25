import dotenv from 'dotenv'

import { getAmdRadeonRx, validateRadeonRxGraphics } from './amd_functions/radeon_rx_functions'
import { normalizeData } from '../../global/functions'
import { saveRadeonCards } from '../../saveRecords/amd/radeon'
import { AmdScrape, RadeonSeriesEnum } from '../../../../packages/types'
import { AppDataSource, initDatabase } from '../../db'

dotenv.config()

const { amd_website_domain, amd_radeon_rx_graphics_card_route } = process.env

async function runRadeonRxScraper(series?: RadeonSeriesEnum) {
	AppDataSource.isInitialized || initDatabase()

	const amd_graphics_cards = await getAmdRadeonRx({
		domain: amd_website_domain || '',
		route: amd_radeon_rx_graphics_card_route || '',
		tabIndex: AmdScrape.Radeon
	}, series)

	const normalizedAmdGraphicsCards = normalizeData(amd_graphics_cards)
	const validatedRadeonRxCards = validateRadeonRxGraphics(normalizedAmdGraphicsCards)

	await saveRadeonCards(validatedRadeonRxCards)
}

export default runRadeonRxScraper