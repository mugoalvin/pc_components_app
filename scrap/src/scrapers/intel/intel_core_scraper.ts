import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { scrapeIntelCoreUltraProcessors, scrapeIntelCoreIxProcessors } from './intel_functions/intel_functions';
import { saveIntelUltraProcessors } from '../../saveRecords/intel/ultra';
import { normalizeData } from '../../global/functions';
import { saveIntelCoreIxProcessors } from '../../saveRecords/intel/core';

dotenv.config();
const { intel_website_domain, intel_core_ultra_processors_route, intel_core_ix_processors } = process.env;

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



export async function runIntelScraper() {
	// Scarapes Intel Core Ultra Processors
	// const intel_ultra_processors = await scrapeIntelCoreUltraProcessors({
	//     domain: intel_website_domain || '',
	//     route: intel_core_ultra_processors_route || ''
	// })
	// // const intel_ultra_processors = await readJsonFromFile("intel_ultra_processors.json")
	// const processedUltraProcessors = normalizeData(intel_ultra_processors)
	// saveIntelUltraProcessors(processedUltraProcessors)


	const intel_core_processors = await scrapeIntelCoreIxProcessors({
	    domain: intel_website_domain || '',
	    route: intel_core_ix_processors || ''
	})

	// const intel_core_processors = await readJsonFromFile("intel_core_processors.json")
	const processedCoreIx = normalizeData(intel_core_processors)
	saveIntelCoreIxProcessors(processedCoreIx)
}