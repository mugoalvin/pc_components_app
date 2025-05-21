import axios from "axios";
import dotenv from "dotenv"
import express from "express";
import { AmdDevice, ArkSeries, IntelCoreScrapingOptions, IntelGenerationEnum, IntelGraphics, IntelGraphicsScrapingOptions, IntelTierEnum, IntelUltraSeriesEnum, RadeonSeries, RyzenDesktopSeries } from "../utils/types.js";

dotenv.config()
const { SERVER_DOMAIN } = process.env

const scrapeRouter = express.Router()

scrapeRouter.post('/ark', async function(req, res){
	const requestBody :IntelGraphicsScrapingOptions = { family: IntelGraphics.Ark, series: ArkSeries.B_Series}

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_ark`, requestBody)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/ultra', async function(req, res) {
	const requestBody = { series: IntelUltraSeriesEnum.Serie2 }

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_ultra`, requestBody)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/core', async function(req, res) {
	const requestBody: IntelCoreScrapingOptions = { tier: IntelTierEnum.i9, generation: IntelGenerationEnum.gen14 }

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_core`, requestBody)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/ryzen', async function(req, res) {
	const requestBody = { isLaptop: AmdDevice.Desktop, series: RyzenDesktopSeries.Series9000 }

	await axios.post(`${SERVER_DOMAIN}/scrape/amd_ryzen`, requestBody)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/radeon', async function(req, res) {
	const requestBody = { series: RadeonSeries.Series7000 }

	await axios.post(`${SERVER_DOMAIN}/scrape/amd_radeon`, requestBody)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})

export default scrapeRouter