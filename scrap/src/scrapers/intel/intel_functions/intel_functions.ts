import { launch } from 'puppeteer'

import { MyUrl, IntelCoreScrapingOptions, IntelUltraSeries, IntelProcessorLine } from "../../../../../packages/types"
import { IntelCore, IntelCoreUltra } from "../../../../../packages/interfaces"
import { fetchDetailedSpecifications, readIntelTable } from './shared_functions'
import { getIntelCoreUltraProcessors, getTextsAndLinks } from './core_ultra'
import { launchOptions, handleError } from '../../../global/functions'
import { findTierAndGenMatch } from './core_ix'



export async function scrapeIntelCoreIxProcessors(url: MyUrl, scrapeOptions: IntelCoreScrapingOptions): Promise<IntelCore[]> {
	const browser = await launch(launchOptions)
	const page = await browser.newPage()
	try {
		await page.goto(`${url.domain}${url.route}`)
		await page.click(`[data-panel-key=Processors]`)
		await page.waitForSelector(".product-categories.product-categories-2")

		const data_panel_key = await page.evaluate(index => {
			return document.querySelectorAll(".product-category.Processors")[index]?.getAttribute("data-panel-key")
		}, IntelProcessorLine.Core)

		const processorCells = await getTextsAndLinks(page, data_panel_key || '')
		const match = findTierAndGenMatch(processorCells, scrapeOptions)

		await page.goto(`${url.domain}${match?.link}`)
		const initialProcessorValues = await readIntelTable(page)
		return await fetchDetailedSpecifications(page, initialProcessorValues) as IntelCore[]
	}
	catch (error) {
		throw handleError(error, `Failed to scrape ${scrapeOptions.generation}th gen Intel Core ${scrapeOptions.tier} processors.`)
	}
	finally {
		await browser.close()
	}
}


export async function scrapeIntelCoreUltraProcessors(url: MyUrl, series?: IntelUltraSeries): Promise<IntelCoreUltra[]> {
	const browser = await launch(launchOptions)
	try{
		const page = await browser.newPage()
		const initialProcessorValues = await getIntelCoreUltraProcessors(page, url, series)
		return await fetchDetailedSpecifications(page, initialProcessorValues, series) as IntelCoreUltra[]
	}
	catch (error) {
		throw handleError(error, `Failed to scrape Intel Ultra ${series} Processors`)
	}
	finally {
		await browser.close()
	}
}



// export const intelsKeysToKeep = [
// 	// Intel Core
// 	"name", "code_name", "vertical_segment", "processor_number", "lithography", 
// 	"number_of_performance_cores", "number_of_efficient_cores", "total_threads", "max_turbo_frequency",
// 	"cache", "processor_base_power", "launch_date", "memory_types", "graphics_output", "max_resolution_hdmi", "max_resolution_dp",
// 	"number_of_displays_supported", 

// 	// Intel Ultra
// 	"xe_cores", "ray_tracing", "recommended_customer_price",
// ]