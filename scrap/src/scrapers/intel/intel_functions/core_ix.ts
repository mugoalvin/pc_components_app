import { IntelCoreScrapingOptions } from '../../../../../packages/types';
import { handleError } from "../../../global/functions";

export function findTierAndGenMatch(processorCells: { text: string | null; link: string | null }[], scrapeOptions: IntelCoreScrapingOptions) {
	try {
		return processorCells.find(cell => {
			const matchesTier = cell.text?.includes(scrapeOptions.tier)

			const generation = scrapeOptions.generation;
			const regex = new RegExp(`\\b${generation}th\\b`);
			const matchesGeneration = regex.test(cell.text || '');


			return matchesTier && matchesGeneration
		})
	}
	catch (err) {
		handleError(err, "Unable to find processors tier and generation match.")
	}
}