import express from 'express'

import runRyzenScraper from "../scrapers/amd/amd_ryzen_scraper"
import runRadeonRxScraper from "../scrapers/amd/amd_radeon_scraper"
import { runIntelCoreIx } from "../scrapers/intel/intel_core_scraper"
import { runIntelUltra } from "../scrapers/intel/intel_ultra_scraper"
import { runIntelArk } from "../scrapers/intel/intel_ark_scraper"
import { ArkSeries, IntelCoreScrapingOptions, intelGenerations, IntelGraphics, IntelGraphicsScrapingOptions, intelTiers, IntelUltraSeriesValues } from '../../../packages/types'
import { runNvidiaGeforce } from '../scrapers/nvidia/geforce_scraper'


const scrapeRouter = express.Router()
scrapeRouter.use(express.json());


scrapeRouter.post('/intel_ark', async (req, res) => {
	const { family, series } = req.body

	if (!Object.values(IntelGraphics).includes(family) || !Object.values(ArkSeries).includes(series))
		res.json({
			error: "Invalid Family or Series"
		})
	
	const desiredGraphicsToScrape: IntelGraphicsScrapingOptions = { family, series }

	try {
		await runIntelArk(desiredGraphicsToScrape)
		res.json({success: "Successfully saved Intel Ark Graphics Cards."})
	}
	catch(error: any){
		res.json({
			errorMsg: error.message
		})
	}
})



scrapeRouter.post('/intel_ultra', async (req, res) => {
	const { series } = req.body

	if (!IntelUltraSeriesValues.includes(series))
		res.json({
			errorMsg: "Invalid Serie"
		})

	try {
		await runIntelUltra(series)
		res.json({ success: `Successfully saved Intel Ultra ${series} Processors.`})
	}
	catch(error:any) {
		res.json({
			errorMsg: error.message
		})
	}
})



scrapeRouter.post('/intel_core',async (req, res): Promise<any> => {
	const { tier, generation } = req.body

	if(tier && !intelTiers.includes(tier)) 
		res.json({errorMsg: `Invalid Processor Tier "${tier}"`})

	if(generation && !intelGenerations.includes(generation))
		res.json({errorMsg: `Invalid Processor Generation "${generation}"`})

	try {
		const desiredIntelProcessoesToScrape: IntelCoreScrapingOptions = { tier, generation }
		await runIntelCoreIx(desiredIntelProcessoesToScrape)
		res.json({ success: `Successfully saved ${generation}th gen Intel Core ${tier} Processors.`})
	}
	catch(error: any) {
		res.json({
			errorMsg: error.message
		})
	}
})



scrapeRouter.post('/amd_ryzen', async function(req, res){
	const { isLaptop, series } = req.body
	try{
		const isLaptopProcessors = isLaptop
		await runRyzenScraper( isLaptopProcessors, series )
		res.json({success: 'Successfully saved Ryzen processors'})
	}
	catch(error: any) {
		res.json({
			errorMsg: error.message
		})
	}
})



scrapeRouter.post('/amd_radeon', async function(req, res) {
	const { series } = req.body
	try{
		await runRadeonRxScraper(series)
		res.json({success: 'Successfully saved all Radeon Cards.'})
	}
	catch(error: any) {
		res.json({
			errorMsg: error.message
		})
	}
})


scrapeRouter.post('/geforce', async function(req, res) {
	try {
		await runNvidiaGeforce()
			.then(responce => {
				res.json({ success: "Successfully scraped all Nvidia Cards." })
			})
	}
	catch(error: any) {
		res.json({
			errorMsg: error.message
		})
	}
})


export default scrapeRouter