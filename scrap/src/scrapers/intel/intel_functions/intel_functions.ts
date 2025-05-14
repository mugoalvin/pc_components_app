import { launch } from 'puppeteer'

import { MyUrl } from '../../../global/types'
import { InitialIntelProps, IntelCore, IntelCoreUltra, IntelCoreScrapingOptions, IntelUltraSeries, Processors } from '../types'
import { fetchProcessorFamilies, getFamilyProcessors } from './core_ix'
import { fetchDetailedSpecifications, readIntelTable } from './shared_functions'
import { getIntelCoreUltraProcessors, getTextsAndLinks, processSeries } from './core_ultra'
import { launchOptions, handleError } from '../../../global/functions'


export function findTierAndGenMatch(processorCells: { text: string | null; link: string | null }[], scrapeOptions: IntelCoreScrapingOptions) {
	return processorCells.find(cell => {
		const matchesTier = cell.text?.includes(scrapeOptions.tier)
		const matchesGeneration = cell.text?.includes(`${scrapeOptions.generation}th`)

		return matchesTier && matchesGeneration
	})
}

/**
 * Scrapes detailed information for Intel Core ix series processors
 * @param url - Object containing domain and route for Intel processors page
 * @param scrapeOptions - Object containing Intel Tiers and Generation
 * @returns Promise containing array of detailed processor information
 * @throws Error if scraping fails
 * 
 * Process:
 * 1. Launches headless browser
 * 2. Gets all processor families (i3, i5, i7, i9)
 * 3. Scrapes processor info for each family
 * 4. Gets detailed specs for each processor
 */
export async function scrapeIntelCoreIxProcessors(url: MyUrl, scrapeOptions: IntelCoreScrapingOptions): Promise<IntelCore[]> {
	const browser = await launch(launchOptions)
	const page = await browser.newPage()
	try {
		await page.goto(`${url.domain}${url.route}`)
		await page.click(`[data-panel-key=Processors]`)
		await page.waitForSelector(".product-categories.product-categories-2")

		const data_panel_key = await page.evaluate(index => {
			return document.querySelectorAll(".product-category.Processors")[index]?.getAttribute("data-panel-key")
		}, Processors.Core)

		const processorCells = await getTextsAndLinks(page, data_panel_key || '')
		const match = findTierAndGenMatch(processorCells, scrapeOptions)

		await page.goto(`${url.domain}${match?.link}`)
		const initialProcessorValues = await readIntelTable(page)
		return await fetchDetailedSpecifications(page, initialProcessorValues)
	}
	catch (error) {
		handleError(error)
		return []
	}
	finally {
		await browser.close()
	}
}




/**
 * Scrapes detailed information for Intel Core Ultra processors
 * @param url - Object containing domain and route for Intel Ultra processors page
 * @returns Promise containing array of detailed Ultra processor information
 * @throws Error if scraping fails
 * 
 * Process:
 * 1. Launches headless browser
 * 2. Gets initial processor data from main Ultra page
 * 3. Fetches detailed specifications for each processor
 */
export async function scrapeIntelCoreUltraProcessors(url: MyUrl, series?: IntelUltraSeries): Promise<IntelCoreUltra[]> {
	const browser = await launch(launchOptions)

	try{
		const page = await browser.newPage()
		const initialProcessorValues = await getIntelCoreUltraProcessors(page, url, series)
		return await fetchDetailedSpecifications(page, initialProcessorValues, series)

		// return (await fetchProcessorSpecifications(page, initialProcessorValues)).map(processor => ({
		// 	...processor,
		// 	series
		// })) as IntelCoreUltra[]
	}
	catch (error) {
		handleError(error)
		return []
	}
	finally {
		await browser.close()
	}
}