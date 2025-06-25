import { handleError } from "../../../global/functions";
import { IntelCoreScrapingOptions } from '../../../../../packages/types'

export function findTierAndGenMatch(processorCells: { text: string | null; link: string | null }[], scrapeOptions: IntelCoreScrapingOptions) {
	try {
		return processorCells.find(cell => {
			const matchesTier = cell.text?.includes(scrapeOptions.tier)
			// const matchesGeneration = cell.text?.includes(`\\b${scrapeOptions.generation}th\\b`)

			const generation = scrapeOptions.generation;
			const regex = new RegExp(`\\b${generation}th\\b`);
			const matchesGeneration = regex.test(cell.text || '');


			return matchesTier && matchesGeneration
		})
	}
	catch (err) {
		throw handleError(err, "Unable to find processors tier and generation match.")
	}
}