import fs from "fs";
import path from "path";
import { LaunchOptions } from "puppeteer";

import { IntelArk, IntelCore, IntelCoreUltra, NvidiaGeForce, Radeon, Ryzen } from "../../../packages/interfaces";

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
	if (numericMatch) return parseFloat(numericMatch[1])
	if (value.includes(',')) return value.split(',').map(v => v.trim())

	return value.trim()
}


export function handleError(error: unknown, context?: string): never {
	if (error instanceof Error) {
		error.message = context
			? `${context}: ${error.message}`
			: error.message
		throw error
	} else {
		throw new Error(
			context
				? `${context}`
				: 'Unknown error : An unknown error occurred'
		)
	}
}

export const launchOptions: LaunchOptions = {
	headless: false,
	defaultViewport: {
		width: 1920,
		height: 1080,
		deviceScaleFactor: 1,
		isLandscape: true
	},
	args: ['--no-sandbox', '--disable-setuid-sandbox']
}


export function convertArrayToString(inputValue: number | string | string[]): string {
	if (typeof (inputValue) === 'number') return String(inputValue)
	if (inputValue.length == 0) return ''
	if (typeof (inputValue) == "string") return inputValue
	return inputValue.reduce(
		(prevValue, currentValue) =>
			`${prevValue}, ${currentValue}`
	)
}


export function normalizeData(arrayOfObjects: IntelCore[] | IntelCoreUltra[] | Ryzen[] | Radeon[] | IntelArk[] | NvidiaGeForce[]) {
	return arrayOfObjects.map(obj => {
		return Object.keys(obj).reduce((acc, key) => {
			const value = obj[key as keyof typeof obj]
			const targetKey = key == "processor_architecture" ? "architecture" : key

			if (targetKey === "displayport" || targetKey === "hdmi") {
				acc[targetKey] = convertArrayToString(value as string | string[])
			} else {
				acc[targetKey] = Array.isArray(value) ?
					convertArrayToString(value) :
					typeof value == "boolean" ? value || false : value
						?? undefined;
			}
			return acc;
		}, {} as Record<string, any>)
	})
}


export function keepOnlyKeys(originalObj: Object, keysToKeep: string[]) {
	return Object.fromEntries(
		Object.entries(originalObj).filter(([key]) => keysToKeep.includes(key))
	)
}


export async function writeJsonToFile(fileName: string, data: any) {
	try {
		const dataFolderPath = path.join(__dirname, '../../../data');
		const filePath = path.join(dataFolderPath, fileName);
		if (!fs.existsSync(dataFolderPath)) {
			fs.mkdirSync(dataFolderPath, { recursive: true });
		}
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
		console.log(`✅ Successfully wrote data to ${filePath}`);
	} catch (error) {
		handleError(error, `❌ Error writing to file ${fileName}`);
	}
}


export async function readJsonFromFile(fileName: string): Promise<any[]> {
	try {
		const dataFolderPath = path.join(__dirname, '../../../scrap/data');
		const filePath = path.join(dataFolderPath, fileName);

		if (!fs.existsSync(filePath)) {
			throw new Error(`File ${fileName} does not exist at ${filePath}`);
		}

		const fileContent = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(fileContent);
	} catch (error) {
		handleError(error, `❌ Error reading from file ${fileName}`);
	}
}