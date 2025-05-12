import { Page } from 'puppeteer'
import dotenv from 'dotenv'

import { normalizeKey, normalizeValue } from '../../../global/functions'
import { InitialIntelProps, IntelCore, IntelCoreUltra } from '../types'

dotenv.config()
const { intel_website_domain } = process.env



/**
 * Fetches detailed information for a single processor from its dedicated page
 * @param page - Puppeteer Page instance
 * @param processor - Initial processor information containing the link
 * @returns Promise containing normalized processor specifications
 */
async function getMoreInfoPerProcessor(page: Page, processor: InitialIntelProps) {
	await page.goto(`${intel_website_domain}${processor.link}`)
	const detailedData = await page.evaluate(() => {
		const sections = Array.from(document.querySelectorAll(".tech-section"))
		return sections.map(section => {
			const rows = Array.from(section.querySelectorAll(".tech-section-row"))
			return {
				...rows.reduce((acc, row) => {
					const label = row.querySelector(".tech-label span")?.textContent || ''
					const data =
						row.querySelector(".tech-data span")?.textContent ||
						row.querySelector(".tech-data a")?.textContent
					
					return { ...acc, [label]: data }
				})
			}
		})
	})

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
 * @returns Promise<IntelCore[]> Array of detailed processor specifications
 */
export async function fetchProcessorSpecifications(page: Page, products: InitialIntelProps[]): Promise<IntelCore[] | IntelCoreUltra[]> {
	console.log("\nGetting detailed information per processor")
	const detailedProcessorsInfo: IntelCore[] | IntelCoreUltra[] = []

	for (const product of products) {
		const detailedInfo = await getMoreInfoPerProcessor(page, product) as IntelCore | IntelCoreUltra

		const index: number = products.indexOf(product) + 1
		const length = products.length
		console.log(`${index}/${length} ✓ ${product.name}`)

		detailedProcessorsInfo.push(detailedInfo)
	}

	return detailedProcessorsInfo
}