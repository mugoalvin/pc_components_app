import { LaunchOptions } from "puppeteer";
import { IntelArk, IntelCore, IntelCoreUltra } from "../scrapers/intel/types";
import { Radeon, Ryzen } from "../scrapers/amd/types";

export function normalizeKey(str: string) {
	return str
		.replace(/#/g, 'number')              // Replace '#' with 'number'
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')          // Replace non-alphanumeric characters with underscores
		.replace(/^_+|_+$/g, '');             // Trim leading/trailing underscores
}


export function normalizeValue(value: string): string | string[] | number | boolean {
	if (!value || typeof value !== 'string') return value

	if (value.toLowerCase().trim() === 'yes') return true
	if (value.toLowerCase().trim() === 'no') return false

	const numericMatch = value.match(/^([\d.]+)\s*()?$/i)
	if (numericMatch) {
		return parseFloat(numericMatch[1])
	}

	if (value.includes(',')) {
		return value.split(',').map(v => v.trim())
	}

	return value.trim()
}


export function handleError(error: any) {
	if (error instanceof Error) {
		throw new Error(error.message)
	} else {
		throw new Error('An unknown error occurred')
	}
}

export const launchOptions: LaunchOptions = {
	headless: false,
	defaultViewport: {
		width: 1920,
		height: 1080,
		deviceScaleFactor: 0,
		isLandscape: true
	}
}


export function convertArrayToString(inputValue: string | string[]): string {
	if (inputValue.length == 0) return ''
	if (typeof(inputValue) == "string") return inputValue
	return inputValue.reduce(
		(prevValue, currentValue) => 
			`${prevValue}, ${currentValue}`
	)
}


export function normalizeData(arrayOfObjects: IntelCore[] | IntelCoreUltra[] | Ryzen[] | Radeon[] | IntelArk[]) {
	return arrayOfObjects.map(obj => {
		return Object.keys(obj).reduce((acc, key) => {
			const value = obj[key as keyof typeof obj]
			acc[key] = Array.isArray(value) ?
				convertArrayToString(value) :
				typeof value == "boolean" ? value || false : value
				?? undefined;
			return acc;
		}, {} as Record<string, any>)
	})
}