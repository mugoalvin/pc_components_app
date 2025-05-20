import { handleError } from "../../../global/functions";
import { IntelCoreScrapingOptions } from "../types"

export function findTierAndGenMatch(processorCells: { text: string | null; link: string | null }[], scrapeOptions: IntelCoreScrapingOptions) {
	try {
		return processorCells.find(cell => {
			const matchesTier = cell.text?.includes(scrapeOptions.tier)
			const matchesGeneration = cell.text?.includes(`${scrapeOptions.generation}th`)

			return matchesTier && matchesGeneration
		})
	}
	catch (err) {
		handleError(err, "Unable to find processors tier and generation match.")
	}
}