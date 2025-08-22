import axios from "axios";
import Constants from 'expo-constants';
import { Alert } from "react-native";
import { AmdDevice, IntelGenerationEnum, IntelGraphicsScrapingOptions, IntelTierEnum, IntelUltraSeriesEnum, NvidiaGeforceSeries, RadeonSeriesEnum, RyzenDesktopSeries, RyzenLaptopSeries, IntelXeonSeries, IntelXeonSeriesType } from "../../../packages/types";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

export interface GeforceScrapeRequestType {
	series: NvidiaGeforceSeries
}
export async function scrapeGeForce(requestParams: GeforceScrapeRequestType) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/geforce`, requestParams)
		Alert.alert("Success", res.data.success)
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		Alert.alert(title.trim(), rest.join(":").trim() || err.message)
	}
}



export interface RyzenScrapeRequestType {
	isLaptop: AmdDevice,
	series: RyzenDesktopSeries | RyzenLaptopSeries
}

export async function scrapeRyzen(requestParams: RyzenScrapeRequestType) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ryzen`, requestParams)
		return res.data.success
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")
		throw {
			errTitle: title.trim(),
			errMsg: rest.join(':').trim()
		}
	}
}



export interface RadeonScraperRequestType {
	series: RadeonSeriesEnum
}

export async function scrapeRadeon(requestParams: RadeonScraperRequestType) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/radeon`, requestParams)
		Alert.alert("Successful Radeon Scrape", res.data.success)
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		Alert.alert(title.trim(), rest.join(':').trim() || err.message)
	}
}



export async function scrapeArk(requestParams: IntelGraphicsScrapingOptions) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ark`, requestParams)
		Alert.alert("Successful Intel Arc Scrape", res.data.success)
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		Alert.alert(title.trim(), rest.join(':').trim() || err.message)
	}
}




export interface UltraScrapeRequestTypes {
	series: IntelUltraSeriesEnum
}

export async function scrapeUltra(requestParams: UltraScrapeRequestTypes) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ultra`, requestParams)
		return res.data.success
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		throw {
			errTitle: title.trim(),
			errMsg: rest.join(':').trim()
		}
	}
}




export interface CoreScrapeRequestParams {
	tier: IntelTierEnum
	generation: IntelGenerationEnum
}

export async function scrapeCore(requestParams: CoreScrapeRequestParams) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/core`, requestParams)
		return res.data.success
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		throw {
			errTitle: title.trim(),
			errMsg: rest.join(':').trim()
		}
	}
}


export interface XeonScrapeRequestParams {
	series: IntelXeonSeries,
	seriesName: IntelXeonSeriesType
}

export async function scrapeXeon(requestParams: XeonScrapeRequestParams) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/xeon`, requestParams)
		return res.data.success
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		throw {
			errTitle: title.trim(),
			errMsg: rest.join(':').trim()
		}
	}
}




export async function connectDatabase() {

	try {
		const res = await axios.post(`${apiDomain}/connect`)
		return "Successful Database Connection"
	}
	catch (err: any) {
		const error: string = err.response?.data?.errorMsg
		const [title, ...rest] = error.split(":")

		throw {
			errTitle: title.trim(),
			errMsg: rest.join(':').trim()
		}
	}
}


export default null