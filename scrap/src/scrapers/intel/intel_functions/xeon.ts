import { Page } from "puppeteer";
import { IntelProcessorLine, IntelXeonSeries, MyUrl } from "../../../../../packages/types";
import { getTextsAndLinks } from "./core_ultra";
import { readIntelTable } from "./shared_functions";

export async function getIntelXeonProcessors(page: Page, url: MyUrl, series: IntelXeonSeries) {
	await page.goto(`${url.domain}${url.route}`)
	await page.click(`[data-panel-key=Processors]`)
	await page.waitForSelector(".product-categories.product-categories-2")

	const data_panel_key = await page.evaluate(index => {
		return document.querySelectorAll(".product-category.Processors")[index]?.getAttribute("data-panel-key")
	}, IntelProcessorLine.Xeon)

	const seriesTextAndLink = await getTextsAndLinks(page, data_panel_key!)
	
	await page.goto(`${url.domain}${seriesTextAndLink[series].link}`)
	return await readIntelTable(page)
}