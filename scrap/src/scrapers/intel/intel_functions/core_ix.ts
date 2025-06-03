import { throwError } from "../../../global/functions";
import { IntelCoreScrapingOptions } from '../../../../../types/types'

export function findTierAndGenMatch(processorCells: { text: string | null; link: string | null }[], scrapeOptions: IntelCoreScrapingOptions) {
	try {
		return processorCells.find(cell => {
			const matchesTier = cell.text?.includes(scrapeOptions.tier)
			const matchesGeneration = cell.text?.includes(`${scrapeOptions.generation}th`)

			return matchesTier && matchesGeneration
		})
	}
	catch (err) {
		throwError(err, "Unable to find processors tier and generation match.")
	}
}