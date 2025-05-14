import { launch } from "puppeteer";
import { MyUrl } from "../../../global/types";
import { handleError, launchOptions } from "../../../global/functions";
import { IntelArk, IntelGraphicsScrapingOptions } from "../types";
import { getTextsAndLinks } from "./core_ultra";
import { fetchDetailedSpecifications, readIntelTable } from "./shared_functions";

export async function scrapeIntelArkGpu(url: MyUrl, options: IntelGraphicsScrapingOptions): Promise<IntelArk[]> {
	const browser = await launch(launchOptions)
	const page = await browser.newPage()
	await page.goto(`${url.domain}${url.route}`)
	await page.click(`[data-panel-key=Graphics]`)
	await page.waitForSelector(".product-categories.product-categories-2")

	try {
		const data_panel_key = await page.evaluate(index => {
			return document.querySelectorAll(".product-category.Graphics")[index]?.getAttribute("data-panel-key")
		}, options.family)

		const textAndLinks = await getTextsAndLinks(page, data_panel_key || '')
		
		await page.goto(`${url.domain}${textAndLinks[options.series].link}`)
		const seriesGraphics = await readIntelTable(page)
		return await fetchDetailedSpecifications(page, seriesGraphics) as IntelArk[]
	}
	catch (err) {
		handleError(err)
		return []
	}
	finally {
		browser.close()
	}
}