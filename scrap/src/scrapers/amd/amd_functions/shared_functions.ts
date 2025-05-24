import { launch, Page } from 'puppeteer'
import dotenv from 'dotenv'
import { InitialAmdProps, Radeon, Ryzen} from '../../../../../types/interfaces'
import { RadeonSeries, RyzenDesktopSeries, RyzenLaptopSeries, MyUrl } from '../../../../../types/types'
import { handleError, launchOptions, normalizeKey, normalizeValue } from '../../../global/functions'


dotenv.config()
const { amd_website_domain } = process.env

/**
 * Retrieves AMD series IDs from the specified tab index
 * @param page - Puppeteer Page instance
 * @param tabIndex - Index of the tab to scrape
 * @returns Array of series with their IDs and names
 */
export async function fetchAmdSeriesIds(page: Page, tabIndex: number) {
    return await page.evaluate((tabIndex) => {
        const amd_series_list = Array.from(document.querySelectorAll("ol.cmp-tabs__tablist")[tabIndex].querySelectorAll("li"))
        // const amd_series_list = Array.from(document.querySelectorAll("ol.cmp-tabs__tablist")[tabIndex].querySelectorAll("li:nth-child(2)"))
        return amd_series_list.map(serie => ({
            id: serie.getAttribute('id'),
            name: serie.textContent?.trim()
        }))
    }, tabIndex)
}

/**
 * Gets all products for a specific AMD series
 * @param page - Puppeteer Page instance
 * @param series_id - ID of the series to scrape
 * @returns Array of products with names and links
 */
export async function fetchSeriesProducts(page: Page, series_id: string) {
    const seriesTableSection = `${series_id}panel`
    const selector = `#${seriesTableSection} tbody tr td:first-child a`
    await page.waitForSelector(selector)

    return await page.evaluate((selector) => {
        const amd_products_in_series = Array.from(document.querySelectorAll(selector))
        return amd_products_in_series.map(product => {
            const name = product.textContent || ''
            const link = product.getAttribute('href') || ''
            return { name, link }
        })
    }, selector)
}

/**
 * Retrieves detailed product information based on product type
 * @param page - Puppeteer Page instance
 * @param product - Initial product information
 * @param isScrapingGraphicsCards - Flag to determine product type
 * @returns Normalized product specifications
 */
export async function fetchProductDetails(page: Page, product: InitialAmdProps, isScrapingGraphicsCards: boolean) {
    const specs = isScrapingGraphicsCards ? 
        await getMoreRadeonRxInfo(page, product) : 
        await getMoreRyzenInfo(page, product)

    return Object.entries(specs).reduce((acc, [key, value]) => ({
        ...acc,
        [key === 'image' ? key : normalizeKey(key)]: key === 'image' ? value : normalizeValue(value)
    }), {})
}

/**
 * Scrapes detailed Ryzen processor information
 * @param page - Puppeteer Page instance
 * @param product - Initial product information
 * @returns Detailed Ryzen specifications
 */
async function getMoreRyzenInfo(page: Page, product: InitialAmdProps) {
    await page.goto(product.link)
    await page.click('.accordion.accordion-flush.product-specs-categories li:first-child button')
    await page.waitForSelector("#panel-product-specs")

    return await page.evaluate((product, domain) => {
        const specSections = Array.from(document.querySelectorAll("#panel-product-specs .accordion-body dl div"))
        const image = document.querySelector(".cmp-image__image")?.getAttribute('src') || ''
        const imageUrl = image !== '' ? `${domain}${image}` : ''

        return {
            image: imageUrl,
            link: product.link,
            ...specSections.reduce((acc, spec) => {
                const key = spec.querySelector('dt')?.textContent?.trim() || ''
                const value = spec.querySelector('dd')?.textContent?.trim() || ''
                return { ...acc, [key]: value }
            }, {})
        }
    }, product, amd_website_domain)
}

/**
 * Scrapes detailed Radeon graphics card information
 * @param page - Puppeteer Page instance
 * @param product - Initial product information
 * @returns Detailed Radeon specifications
 */
async function getMoreRadeonRxInfo(page: Page, product: InitialAmdProps) {
    await page.goto(product.link)
    await page.click('.expansion-toggle.text-end')

    return await page.evaluate((product, domain) => {
        const lists = document.querySelectorAll(".accordion.accordion-flush.product-specs-categories li")
        const allSpecs = {}

        const image = document.querySelector(".cmp-image__image")?.getAttribute('src') || ''
        const imageUrl = image !== '' ? `${domain}${image}` : ''

        for (const list of lists) {
            const specSections = list.querySelectorAll(".accordion-collapse.collapse.show dl div")
            for (const spec of specSections) {
                const key = spec.querySelector('dt')?.textContent?.trim() || ''
                const value = spec.querySelector('dd')?.textContent?.trim() || ''
                // @ts-ignore
                if (key) allSpecs[key] = value
            }
        }

        return {
            image: imageUrl,
            link: product.link,
            ...allSpecs
        }
    }, product, amd_website_domain)
}

/**
 * Processes a list of products to get detailed information
 * @param page - Puppeteer Page instance
 * @param products - Array of products to process
 * @param isScrapingGraphicsCards - Flag to determine product type
 * @returns Array of either Ryzen or Radeon detailed product information
 */
async function fetchDetailedProductSpecs(page: Page, products: InitialAmdProps[], isScrapingGraphicsCards: boolean) {
    const results: (Ryzen | Radeon | InitialAmdProps)[] = []
    for (const product of products) {
        try {
            const specs = await fetchProductDetails(page, product, isScrapingGraphicsCards) as Ryzen | Radeon
            console.log(`${products.indexOf(product) + 1}/${products.length}. ✓ ${specs?.name}`)
            results.push(specs)
        } catch (error) {
            results.push(product as InitialAmdProps)
            handleError(error, `Failed to fetch info for ${product.name}`)
        }
    }
    return results
}

/**
 * Main function to scrape AMD products
 * @param url - URL configuration object
 * @param serie - AMD Ryzen or Radeon series to scrape else all
 * @returns Array of detailed product information
 */
export async function getAmdProducts(url: MyUrl, serie?: RadeonSeries | RyzenDesktopSeries | RyzenLaptopSeries): Promise<Ryzen[] | Radeon[]> {
    const browser = await launch(launchOptions)
    try {
        const page = await browser.newPage()
		await page.goto(`${url.domain}${url.route}`, { waitUntil: ['networkidle0', 'domcontentloaded', 'load'] })

        const amd_series = await fetchAmdSeriesIds(page, url.tabIndex || 1)
        const isScrapingGraphicsCards: boolean = url.tabIndex == 2
        const products: InitialAmdProps[] = []
         
        if (serie !== undefined) {
            await page.click(`#${amd_series[serie || 0].id}`)
            const seriesProducts = await fetchSeriesProducts(page, amd_series[serie || 0].id || '') as InitialAmdProps[]
            products.push(...seriesProducts)
        }
        else {
            for (const series of amd_series) {
                await page.click(`#${series.id}`)
                const results = await fetchSeriesProducts(page, series.id || '') as InitialAmdProps[]
                products.push(...results)
            }
        }
        
        return await fetchDetailedProductSpecs(page, products, isScrapingGraphicsCards) as Ryzen[] | Radeon[]
    } catch (error) {
        handleError(error, "Failed to fetch AMD products")
    } finally {
        await browser.close()
    }
}