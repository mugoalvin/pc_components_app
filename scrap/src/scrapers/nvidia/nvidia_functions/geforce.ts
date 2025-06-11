import { launch, Page } from 'puppeteer';
import { MyUrl, NvidiaGeforceSeries } from '../../../../../packages/types';
import { throwError, launchOptions, normalizeKey } from '../../../global/functions';


async function getButtonClassName(page: Page, serieid: string): Promise<string> {
	return await page.evaluate((id) => {
		const tables = Array.from(document.querySelectorAll(".background-black.p-t-45.p-b-90.lap-p-t-45.lap-p-b-90.tab-p-t-45.tab-p-b-45.mob-p-t-45.mob-p-b-45"))
		const table = tables.find(table => {
			return table.getAttribute('id') === id
		})

		return table?.querySelector(".expand-btn > div")
			?.getAttribute("class")
			?.split(" ")[0] || ""
	}, serieid)
}


async function getGraphicsCardNamesInHeader(page: Page, seriesId: string): Promise<string[]> {
	return await page.evaluate((seriesId) => {
		return Array.from(document.querySelectorAll(`#${seriesId} table thead tr th`))
			.map(header => header.textContent?.trim() || '')
	}, seriesId)
}


async function getGraphicsCardAttributes(page: Page, seriesId: string): Promise<string[]> {
	return await page.evaluate((seriesId) => {
		return Array.from(document.querySelectorAll(`#${seriesId} table tbody tr`))
			.map(row => row.querySelector("td")?.textContent || '')
	}, seriesId)
}


async function getGraphicsProps(page: Page, graphicsAttributes: string[], serieid: NvidiaGeforceSeries) {
	return Promise.all(
		graphicsAttributes.map(async attribute => {
			return await page.evaluate(([serieid, attribute]) => {
				const desiredRow = Array.from(document.querySelectorAll(`#${serieid} table tbody tr`)).find(row => {
					return row.querySelector('td')?.textContent == attribute
				})

				return Array.from(desiredRow?.querySelectorAll("td") || [])
					.map(cell => {
						return cell.textContent
					})
			}, [serieid, attribute])
		})
	)
}

// Main Scraping Function
export async function scrapeNvidiaGpu(url: MyUrl, serieid: NvidiaGeforceSeries) {
	const browser = await launch(launchOptions)

	try {
		const page = await browser.newPage()
		await page.goto(`${url.domain}${url.route}`)

		const btnClassName = await getButtonClassName(page, serieid)
		await page.click(`.${btnClassName}`)

		const graphicsCards = await getGraphicsCardNamesInHeader(page, serieid)
		const graphicsAttributes = await getGraphicsCardAttributes(page, serieid)

		const processedGraphicsAttributes = graphicsAttributes
			.filter(attribute => attribute !== '' && attribute !== null && !attribute.includes(':'))

		const attributesData = await getGraphicsProps(page, processedGraphicsAttributes, serieid)

		return graphicsCards.map((card, i) => {
			const obj = { name: card };
			processedGraphicsAttributes.forEach((attr, j) => {
				// @ts-ignore
				obj[normalizeKey(attr)] = attributesData[j][i];
			});
			return obj;
		}).slice(1)
	}
	catch (err) {
		throwError(err, "Failed to scrape Nvidia GeForce Graphics.")
	}
}