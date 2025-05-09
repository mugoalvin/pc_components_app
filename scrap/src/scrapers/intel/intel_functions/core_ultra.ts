import { Page } from "puppeteer"
import { MyUrl } from "../../amd/types"
import { InitialIntelProps } from "../types"

export async function getIntelCoreUltraProcessors(page: Page, url: MyUrl): Promise<InitialIntelProps[]> {
	await page.goto(`${url.domain}${url.route}`, {waitUntil: 'networkidle0'})

	return await page.evaluate(() => {
		function formatProcessorName(processorName: string): string {
			return processorName
				?.slice( 0, processorName?.indexOf("("))
				.replace("Processor", '')
				.replace("  ", ' ')
				.trim()
		}

		const tableRows = Array.from(document.querySelectorAll('tbody tr'))
		return tableRows.map(row => {
			const name = formatProcessorName(row?.querySelector('td div a')?.textContent || '')
			const link = row?.querySelector('td div a')?.getAttribute('href') || ''

			return { name, link } as InitialIntelProps
		})
	})
}