import dotenv from 'dotenv'
import { Page } from "puppeteer"

import { InitialIntelProps, IntelFamily } from "../types"
import { MyUrl } from '../../../global/types'


dotenv.config()
const { intel_website_domain } = process.env

export async function fetchProcessorFamilies(page: Page, url: MyUrl): Promise<IntelFamily[]> {
	await page.goto(`${url.domain}${url.route}`)
	return await page.evaluate(() => {
		// const processorFamilies = Array.from(document.querySelectorAll('#ps-accordion-panel-0')).slice(0, 4)
		const processorFamilies = Array.from(document.querySelectorAll('#ps-accordion-panel-0')).slice(0, 1)
		return processorFamilies.map(family => {
			const familyName = family.querySelector(".panel-name")?.textContent || ''
			const familyLink = family.querySelector("a")?.getAttribute('href') || ''

			return { familyName, familyLink }
		})
	})
}


export async function getFamilyProcessors(page: Page, family: IntelFamily) {
	console.log(`\nGetting ${family.familyName} processors`)
	await page.goto(`${intel_website_domain}${family.familyLink}`)
	await page.waitForSelector(".products.navigation-tab a")
	await page.click(".products.navigation-tab a")
	await page.waitForSelector("tbody")
	const familyProcessors = await page.evaluate(() => {
		const tableRows = Array.from(document.querySelectorAll("tbody tr"))
		function formatProcessorName(processorName: string): string {
			return processorName
				?.slice( 0, processorName?.indexOf("Processor"))
				.trim()
		}
		
		return tableRows.map(row => {
			const name = formatProcessorName(row.querySelector('td a')?.textContent || "")
			const link = row.querySelector('td a')?.getAttribute("href") || ''

			return { name, link } as InitialIntelProps
		})
	})
	console.log(`Found ${familyProcessors.length} processors.`)
	return familyProcessors
}