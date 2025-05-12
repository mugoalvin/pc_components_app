import { launch } from 'puppeteer'

import { MyUrl } from '../../../global/types'
import { InitialIntelProps, IntelCore, IntelCoreUltra } from '../types'
import { fetchProcessorFamilies, getFamilyProcessors } from './core_ix'
import { fetchProcessorSpecifications } from './shared_functions'
import { getIntelCoreUltraProcessors } from './core_ultra'
import { launchOptions, handleError } from '../../../global/functions'



/**
 * Scrapes detailed information for Intel Core ix series processors
 * @param url - Object containing domain and route for Intel processors page
 * @returns Promise containing array of detailed processor information
 * @throws Error if scraping fails
 * 
 * Process:
 * 1. Launches headless browser
 * 2. Gets all processor families (i3, i5, i7, i9)
 * 3. Scrapes processor info for each family
 * 4. Gets detailed specs for each processor
 */
export async function scrapeIntelCoreIxProcessors(url: MyUrl): Promise<IntelCore[]> {
	const browser = await launch(launchOptions)
	try {
		const page = await browser.newPage()
		const families = await fetchProcessorFamilies(page, url)
		const intelCoreProcessors: InitialIntelProps[] = []

		for (const family of families) {
			const page = await browser.newPage()
			const data = await getFamilyProcessors(page, family)
			intelCoreProcessors.push(...data)
			await page.close()
		}

		return await fetchProcessorSpecifications(page, intelCoreProcessors) as IntelCore[]
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
export async function scrapeIntelCoreUltraProcessors(url: MyUrl): Promise<IntelCoreUltra[]> {
	const browser = await launch(launchOptions)

	try{
		const page = await browser.newPage()
		const initialProcessorValues = await getIntelCoreUltraProcessors(page, url)
		return await fetchProcessorSpecifications(page, initialProcessorValues) as IntelCoreUltra[]
	}
	catch (error) {
		handleError(error)
		return []
	}
	finally {
		await browser.close()
	}
}