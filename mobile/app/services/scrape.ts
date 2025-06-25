import axios from "axios";
import Constants from 'expo-constants';
import { Alert } from "react-native";
import { AmdDevice, ArkSeries, IntelGenerationEnum, IntelGraphics, IntelTierEnum, IntelUltraSeriesEnum, NvidiaGeforceSeries, RadeonSeriesEnum, RyzenDesktopSeries, RyzenLaptopSeries } from "../../../packages/types";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

export async function makeApiRequestToScrapeGeforce() {
	const requestBody = { series: NvidiaGeforceSeries.Series50 }
	try {
		const res = await axios.post(`${apiDomain}/scrape/geforce`, requestBody)
		Alert.alert("Success", res.data.success)
	}
	catch(err: any) {
		Alert.alert('Error', err.errorMsg || err.message)
	}
}



export interface RyzenScrapeRequestType {
	isLaptop: AmdDevice,
	series: RyzenDesktopSeries | RyzenLaptopSeries
}

export async function scrapeRyzen(requestParams: RyzenScrapeRequestType) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ryzen`, requestParams)
		Alert.alert("Successful Ryzen Scrape", res.data.success)
	}
	catch (err: any) {
		Alert.alert("Ryzen Scrape Error", err.errorMsg || err.message)
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
		Alert.alert("Radeon Scrape Error", err.errorMsg || err.message)
	}
}



export interface ArkScrapeRequestTypes {
	family: IntelGraphics
	series: ArkSeries
}

export async function scrapeArk(requestParams: ArkScrapeRequestTypes) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ark`, requestParams)
		Alert.alert("Successful Intel Arc Scrape", res.data.success)
	}
	catch (err: any) {
		Alert.alert("Ark Scrape Error", err.errorMsg || err.message)
	}
}




export interface UltraScrapeRequestTypes {
	series: IntelUltraSeriesEnum
}

export async function scrapeUltra(requestParams: UltraScrapeRequestTypes) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/ultra`, requestParams)
		Alert.alert("Successful Ultra Scrape", res.data.success)
	}
	catch (err: any) {
		Alert.alert("Intel Ultra Scrape Error", err.errorMsg || err.message)
	}
}




export interface CoreScrapeRequestParams {
	tier: IntelTierEnum
	generation: IntelGenerationEnum
}

export async function scrapeCore(requestParams: CoreScrapeRequestParams) {

	try {
		const res = await axios.post(`${apiDomain}/scrape/core`, requestParams)
		Alert.alert("Successful Core Scrape", res.data.success)
	}
	catch (err: any) {
		Alert.alert(`Intel Core Scrape Error`, err.errorMsg || err.message)
	}
}




export async function connectDatabase() {

	try {
		const res = await axios.post(`${apiDomain}/connect`)
		Alert.alert("Successful Database Connection", res.data.success)
	}
	catch (err: any) {
		Alert.alert("Database Connection Error", err.errorMsg || err.message)
	}
}



export default null