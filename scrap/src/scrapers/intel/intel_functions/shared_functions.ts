import dotenv from 'dotenv'
import { Page } from 'puppeteer'

import { InitialIntelProps, IntelArk, IntelCore, IntelCoreUltra, IntelXeon } from '../../../../../packages/interfaces'
import { IntelUltraSeries } from '../../../../../packages/types'
import { handleError, normalizeKey, normalizeValue } from '../../../global/functions'
import { ProgressReporter } from '../../../global/websocket/ProgressReporter'

dotenv.config()
const { intel_website_domain } = process.env

/**
 * Fetches detailed information for a single processor from its dedicated page
 * @param page - Puppeteer Page instance
 * @param processor - Initial processor information containing the link
 * @returns Promise containing normalized processor specifications
 */
async function getMoreInfoPerProduct(page: Page, processor: InitialIntelProps) {
	await page.goto(`${intel_website_domain}${processor.link}`)
	const detailedData = await page.evaluate(() => {
		const imageSrc = document.querySelector(".product-spec-block.hidden-mobile figure span img")?.getAttribute("src")
		const sections = Array.from(document.querySelectorAll(".tech-section"))
		return sections.map(section => {
			const rows = Array.from(section.querySelectorAll(".tech-section-row"))
			return {
				...rows.reduce((acc, row) => {
					const label = row.querySelector(".tech-label span")?.textContent || ''
					const value =
						row.querySelector(".tech-data span")?.textContent ||
						row.querySelector(".tech-data a")?.textContent

					return { ...acc, [label]: value }
				}, {}), image: imageSrc
			}
		})
	}, intel_website_domain)

	const flattenedData = detailedData.reduce((acc, obj) => ({ ...acc, ...obj }), {})

	return {
		name: processor.name,
		...Object.entries(flattenedData).reduce((acc, [key, value]) => ({
			...acc,
			[key === 'image' ? key : normalizeKey(key)]: key === 'image' ? value : normalizeValue(String(value))
		}), {})
	}
}



/**
 * Iterates through a list of processors and fetches detailed specifications for each
 * @param page - Puppeteer Page instance
 * @param products - Array of initial processor information
 * @param series - Series number of Intel Ultra.
 * @returns Promise<IntelCore[]> Array of detailed processor specifications
 */
export async function fetchDetailedSpecifications(page: Page, products: InitialIntelProps[], series?: IntelUltraSeries): Promise<IntelCore[] | IntelCoreUltra[] | IntelArk[] | IntelXeon[]> {
	console.log("\nGetting detailed information per product.")
	const reporter = new ProgressReporter()
	try {
		const detailedSpecifications: IntelCore[] | IntelCoreUltra[] | IntelArk[] = []

		for (const product of products) {
			const rawData = await getMoreInfoPerProduct(page, product)

			let detailedInfo: IntelCore | IntelCoreUltra | IntelArk
			detailedInfo = series ? { ...rawData as IntelCoreUltra, series } : rawData as IntelCore | IntelArk

			const index = products.indexOf(product) + 1
			const length = products.length
			console.log(`${index}/${length} ✓ ${product.name}`)

			// @ts-ignore
			detailedSpecifications.push(detailedInfo)

			reporter.report(
				Math.trunc(
					(index / length) * 100
				)
			)
		}

		return detailedSpecifications as IntelCore[] | IntelCoreUltra[] | IntelArk[] | IntelXeon[]
	}
	catch (err) {
		handleError(err, "Failed to fetch detailed information")
	}
}


export async function readIntelTable(page: Page): Promise<InitialIntelProps[]> {
	try {
		return await page.evaluate(() => {
			function formatProcessorName(processorName: string): string {
				if (!processorName) return ''
				const cutIndex = processorName.indexOf("(")
				if (cutIndex !== -1) processorName = processorName.slice(0, cutIndex);

				return processorName
					.replace("Processor", "")
					.replace("processor", "")
					.replace("  ", " ")
					.trim();
			}

			const tableRows = Array.from(document.querySelectorAll('tbody tr'))
			return tableRows.map(row => {
				const name = formatProcessorName(row?.querySelector('td div a')?.textContent || '')
				const link = row?.querySelector('td div a')?.getAttribute('href') || ''

				return { name, link } as InitialIntelProps
			})
		})
	}
	catch (err) {
		handleError(err, "Unable to read Intel data table.")
	}
}