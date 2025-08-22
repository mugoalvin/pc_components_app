import { Page } from "puppeteer";

import { IntelProcessorLine, IntelUltraSeries, MyUrl } from "../../../../../packages/types";
import { readIntelTable } from "./shared_functions";

// Extracts series text and links from the page
export async function getTextsAndLinks(page: Page, data_panel_key: string): Promise<{ text: string, link: string }[]> {
	await page.waitForSelector(`[data-panel-key=${data_panel_key}]`);
	await page.click(`[data-panel-key=${data_panel_key}] span`);

	return await page.evaluate((data_panel_key) => {
		const series = Array.from(document.querySelectorAll(`[data-parent-panel-key=${data_panel_key}] .product-row .name a`));
		return series.map(serie => ({
			text: serie.textContent || '',
			link: serie.getAttribute("href") || '',
		}));
	}, data_panel_key);
}

// Processes a specific series or all series
export async function processSeries(page: Page, url: MyUrl, seriesTextAndLink: { text: string | null; link: string | null }[], series?: IntelUltraSeries) {
	if (series) {
		const seriesToScrape = seriesTextAndLink.find(serie => serie.text?.includes(series))
		await page.goto(`${url.domain}${seriesToScrape?.link}`)

		return await readIntelTable(page)
	} else {
		const results = []
		for (const serie of seriesTextAndLink) {
			await page.goto(`${url.domain}${serie.link}`)
			const data = await readIntelTable(page)
			results.push(...data)
		}
		return results;
	}
}

// Main function
export async function getIntelCoreUltraProcessors(page: Page, url: MyUrl, series?: IntelUltraSeries) {
	await page.goto(`${url.domain}${url.route}`)
	await page.click(`[data-panel-key=Processors]`)
	await page.waitForSelector(".product-categories.product-categories-2")

	const data_panel_key = await page.evaluate(index => {
		return document.querySelectorAll(".product-category.Processors")[index]?.getAttribute("data-panel-key")
	}, IntelProcessorLine.Ultra)

	const seriesTextAndLink = await getTextsAndLinks(page, data_panel_key!)
	return await processSeries(page, url, seriesTextAndLink, series)
}