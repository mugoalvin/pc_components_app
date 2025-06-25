import axios from "axios";
import dotenv from "dotenv"
import express from "express";

dotenv.config()
const { SERVER_DOMAIN } = process.env

const scrapeRouter = express.Router()
scrapeRouter.use(express.json())

scrapeRouter.post('/ark', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_ark`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/ultra', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_ultra`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/core', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/intel_core`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/ryzen', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/amd_ryzen`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg || err.message)
		})
})


scrapeRouter.post('/radeon', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/amd_radeon`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


scrapeRouter.post('/geforce', async function (req, res) {

	await axios.post(`${SERVER_DOMAIN}/scrape/geforce`, req.body)
		.then(serverResponce => {
			res.json(serverResponce.data)
		})
		.catch(err => {
			res.send(err.errorMsg)
		})
})


export default scrapeRouter