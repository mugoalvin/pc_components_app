import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { scrapeIntelCoreUltraProcessors, scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';
import { saveIntelUltraProcessors } from '../../saveRecords/intel/ultra';
import { normalizeData } from '../../global/functions';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';
import { IntelCoreScrapingOptions } from './types';

dotenv.config();
const { intel_website_domain, intel_ark_route } = process.env;

async function writeJsonToFile(fileName: string, data: any) {
	try {
		const dataFolderPath = path.join(__dirname, '../../../data');
		const filePath = path.join(dataFolderPath, fileName);
		if (!fs.existsSync(dataFolderPath)) {
			fs.mkdirSync(dataFolderPath, { recursive: true });
		}
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
		console.log(`✅ Successfully wrote data to ${filePath}`);
	} catch (error) {
		console.error(`❌ Error writing to file ${fileName}:`, error);
	}
}


async function readJsonFromFile(fileName: string): Promise<any[]> {
	try {
		const dataFolderPath = path.join(__dirname, '../../../data');
		const filePath = path.join(dataFolderPath, fileName);

		if (!fs.existsSync(filePath)) {
			throw new Error(`File ${fileName} does not exist at ${filePath}`);
		}

		const fileContent = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(fileContent);
	} catch (error) {
		console.error(`❌ Error reading from file ${fileName}:`, error);
		throw error;
	}
}


export async function runIntelCoreIx() {
	const desiredIntelProcessoesToScrape: IntelCoreScrapingOptions = {
		tier: 'i9',
		generation: 14
	}

	const intel_core_processors = await scrapeIntelCoreIxProcessors({
	    domain: intel_website_domain || '',
	    route: intel_ark_route || ''
	}, desiredIntelProcessoesToScrape)

	const processedCoreIx = normalizeData(intel_core_processors)
	saveIntelCoreIxProcessors(processedCoreIx)
}