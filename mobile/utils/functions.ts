import { getTableRowCount } from "@/app/services/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IntelCore, IntelCoreUltra, IntelXeon, Ryzen } from "../../packages/interfaces"
import { DatabaseTables, IntelGeneration } from "../../packages/types"
import { CoreDeviceChipsOptions, RyzenDeviceChipsOptions, RyzenTierChipsOptions, SectionedDataItem, UltraDeviceChipsOptions, XeonChipsOptions } from "./types"

export function makeKeyUserFriendly(text: string): string {
	return text
		.replaceAll('_', ' ')
		.split(' ')
		.map(word =>
			word.slice(0, 1).toUpperCase() + word.slice(1)
		).join(' ')
}


export async function getNoOfRowsInTables(tables: DatabaseTables | DatabaseTables[]): Promise<number> {
	if (!tables || (Array.isArray(tables) && tables.length === 0)) {
		return 0
	}
	const tableList = Array.isArray(tables) ? tables : [tables]
	let totalCount = 0
	for (const table of tableList) {
		const count = await getTableRowCount(table)
		totalCount += count || 0
	}
	return totalCount
}

export async function getRowCount(tableName: DatabaseTables) {
	return await getTableRowCount(tableName)
}

export function filterRyzenWithPerformanceTier(processors: Ryzen[], tier: RyzenTierChipsOptions) {
	if (tier === "all") return processors
	const regex = new RegExp(`\\b${tier}\\b`)
	return processors.filter(processor => regex.test(processor.name))
}

export const isSet = (v: any) => v !== null && v !== undefined;

export const setAsyncData = async (key: string, value: string) => {
	await AsyncStorage.setItem(key, value)
}

export const getAsyncData = async (key: string): Promise<string> => {
	return await AsyncStorage.getItem(key) || ''
}





export function getSectionedRyzenData(ryzenProcessors: Ryzen[], deviceOption: RyzenDeviceChipsOptions): SectionedDataItem[] {
	function getCountPerSeries(series: string) {
		return ryzenProcessors.filter(ryzen => ryzen.series === series).length
	}

	function getTimestamps(series: string) {
		try {
			const found = ryzenProcessors.find(ryzen => ryzen.series === series)
			return found && found.updated_at
				? new Date(found.updated_at).toLocaleDateString()
				: "Not Found"
		} catch (err) {
			console.log(err)
			return "Not Found"
		}
	}

	const allSections = [
		{
			title: "High End",
			data: [
				{ name: "Ryzen 9000 Series", amdSeries: "Series9000", tableColumnData: "Ryzen 9000 Series", lastUpdated: `${getTimestamps("Ryzen 9000 Series")}`, count: `${getCountPerSeries("Ryzen 9000 Series")} Processors`, device: "all" },
				{ name: "Ryzen 8000 Series", amdSeries: "Series8000", tableColumnData: "Ryzen 8000 Series", lastUpdated: `${getTimestamps("Ryzen 8000 Series")}`, count: `${getCountPerSeries("Ryzen 8000 Series")} Processors`, device: "all" },
				{ name: "Ryzen 7000 Series", amdSeries: "Series7000", tableColumnData: "Ryzen 7000 Series", lastUpdated: `${getTimestamps("Ryzen 7000 Series")}`, count: `${getCountPerSeries("Ryzen 7000 Series")} Processors`, device: "all" },
				{ name: "Ryzen 200", amdSeries: "Ryzen200", tableColumnData: "Ryzen 200 Series", lastUpdated: `${getTimestamps("Ryzen 200 Series")}`, count: `${getCountPerSeries("Ryzen 200 Series")} Processors`, device: "laptop" }
			]
		},
		{
			title: "Mid-Range",
			data: [
				{ name: "Ryzen 6000 Series", amdSeries: "Ryzen6000", tableColumnData: "Ryzen 6000 Series", lastUpdated: `${getTimestamps("Ryzen 6000 Series")}`, count: `${getCountPerSeries("Ryzen 6000 Series")} Processors`, device: "all" },
				{ name: "Ryzen 5000 Series", amdSeries: "Series5000", tableColumnData: "Ryzen 5000 Series", lastUpdated: `${getTimestamps("Ryzen 5000 Series")}`, count: `${getCountPerSeries("Ryzen 5000 Series")} Processors`, device: "desktop" },
				{ name: "Ryzen 4000 Series", amdSeries: "Series4000", tableColumnData: "Ryzen 4000 Series", lastUpdated: `${getTimestamps("Ryzen 4000 Series")}`, count: `${getCountPerSeries("Ryzen 4000 Series")} Processors`, device: "desktop" }
			]
		},
		{
			title: "AI-Focused",
			data: [
				{ name: "Ryzen Ai Max", amdSeries: "RyzenAiMax", tableColumnData: "Ryzen AI Max", lastUpdated: `${getTimestamps("Ryzen AI Max 300 Series")}`, count: `${getCountPerSeries("Ryzen AI Max 300 Series")} Processors`, device: "laptop" },
				{ name: "Ryzen Ai 300", amdSeries: "RyzenAi300", tableColumnData: "Ryzen AI 300 Series", lastUpdated: `${getTimestamps("Ryzen AI 300 Series")}`, count: `${getCountPerSeries("Ryzen AI 300 Series")} Processors`, device: "laptop" }
			]
		}
	]

	const filteredSections = allSections.map(section => ({
		...section,
		data: section.data.filter(item =>
			deviceOption === 'all'
				? true
				: item.device === deviceOption || item.device === 'all'
		)
	})).filter(section => section.data.length > 0)

	return filteredSections.length > 0
		? filteredSections
		: []
}



export function getSectionedUltraData(ultraProcessors: IntelCoreUltra[], deviceOptions: UltraDeviceChipsOptions): SectionedDataItem[] {
	function getCountPerSeries(line: string) {
		return ultraProcessors.filter(ultra => ultra.name?.includes(line)).length
	}

	const allSections = [
		{
			title: "High-End",
			data: [
				{ name: "Ultra 9", lastUpdated: '', count: `${getCountPerSeries('Ultra 9')} Processors` },
				{ name: "Ultra 7", lastUpdated: '', count: `${getCountPerSeries('Ultra 7')} Processors` },
			]
		},
		{
			title: "Entry/Mid-Range/Low-End",
			data: [
				{ name: "Ultra 5", lastUpdated: '', count: `${getCountPerSeries('Ultra 5')} Processors` },
				{ name: "Ultra 3", lastUpdated: '', count: `${getCountPerSeries('Ultra 3')} Processors` },
			]
		}
	]


	const filteredSections = allSections.map(section => ({
		...section,
		data: section.data.filter(item =>
			deviceOptions === 'all'
				? true
				: item.name !== 'Ultra 3'
		)
	})).filter(section => section.data.length > 0)

	return filteredSections.length > 0
		? filteredSections
		: []
}


export function isIntelGenMatching(processor_number: string, gen: number): boolean {
	const match = processor_number.match(/-(\d+)/);
	if (!match) return false;

	const modelNumber = match[1];
	if (modelNumber.length < 2) return false

	const first = Number(modelNumber[0]);
	const second = Number(modelNumber[1]);
	const genDigits = first < 4 ? Number(`${first}${second}`) : first;

	return genDigits === gen;
}


export function getSectionedCoreData(coreProcessors: IntelCore[], chipPressed: CoreDeviceChipsOptions): SectionedDataItem[] {

	function getCountPerGeneration(generation: IntelGeneration, chipPressed: CoreDeviceChipsOptions) {
		return coreProcessors
			.filter(core =>
				isIntelGenMatching(core.processor_number || "", generation) && (
					chipPressed === 'all' ? core :
						core.vertical_segment?.toLowerCase() === chipPressed
				)
			).length
	}
	const allSections = [
		{
			title: "Hybrid Era",
			data: [
				{ name: "Gen 14", generation: 'gen14', lastUpdated: '', count: `${getCountPerGeneration(14, chipPressed)} Processors`, },
				{ name: "Gen 13", generation: 'gen13', lastUpdated: '', count: `${getCountPerGeneration(13, chipPressed)} Processors`, },
				{ name: "Gen 12", generation: 'gen12', lastUpdated: '', count: `${getCountPerGeneration(12, chipPressed)} Processors`, },
			]
		},
		{
			title: "Final Monolithic",
			data: [
				{ name: "Gen 11", generation: 'gen11', lastUpdated: '', count: `${getCountPerGeneration(11, chipPressed)} Processors`, },
				{ name: "Gen 10", generation: 'gen10', lastUpdated: '', count: `${getCountPerGeneration(10, chipPressed)} Processors`, },
			]
		},
		{
			title: "Transition Era",
			data: [
				{ name: "Gen 9", generation: 'gen9', lastUpdated: '', count: `${getCountPerGeneration(9, chipPressed)} Processors`, },
				{ name: "Gen 8", generation: 'gen8', lastUpdated: '', count: `${getCountPerGeneration(8, chipPressed)} Processors`, }
			]
		},
		{
			title: "Legacy Era",
			data: [
				{ name: "Gen 7", generation: 'gen8', lastUpdated: '', count: `${getCountPerGeneration(8, chipPressed)} Processors`, },
				{ name: "Gen 6", generation: 'gen6', lastUpdated: '', count: `${getCountPerGeneration(6, chipPressed)} Processors`, },
				{ name: "Gen 5", generation: 'gen5', lastUpdated: '', count: `${getCountPerGeneration(5, chipPressed)} Processors`, },
				{ name: "Gen 4", generation: 'gen4', lastUpdated: '', count: `${getCountPerGeneration(4, chipPressed)} Processors`, }
			]
		}
	]

	return allSections

	const filteredSections = allSections.map(section => ({
		...section,
		/* TODO */
		// Don't forget to handle the below login to dynamically display or remove sections in the section list.

		data: section.data.filter(item => {
			const count = parseInt(item.count)
			return !isNaN(count) && count > 0
		})
	})).filter(section => section.data.length > 0)

	return filteredSections.length > 0
		? filteredSections
		: []
}

export function getSectionedXeonData(xeonProcessors: IntelXeon[], selectedChip?: XeonChipsOptions): SectionedDataItem[] {

	function getCount(pattern: string) {
		return xeonProcessors.filter(xeon =>
			xeon.seriesName === pattern &&
			(selectedChip === "all" ? true : (xeon.vertical_segment)?.toLowerCase().trim() === selectedChip),
		).length
	}


	const xeonSections: SectionedDataItem[] = [
		{
			title: "Special Purpose",
			data: [
				{ name: "Xeon CPU Max", xeonSeries: 'CPU_Max', count: `${getCount("CPU_Max")} Processors` },
				{ name: 'Xeon 6', xeonSeries: 'Xeon6', count: `${getCount("Xeon6")} Processors` },
				{ name: "Xeon D", xeonSeries: 'D', count: `${getCount("D")} Processors` },
				{ name: "Xeon W", xeonSeries: 'W', count: `${getCount("W")} Processors` },
				{ name: "Xeon E", xeonSeries: 'E', count: `${getCount("E")} Processors` },
			]
		},
		{
			title: "Scalable Series",
			data: [
				{ name: "Scalable 5", xeonSeries: 'Scalable_Gen_5', count: `${getCount("Scalable_Gen_5")} Processors` },
				{ name: "Scalable 4", xeonSeries: 'Scalable_Gen_4', count: `${getCount("Scalable_Gen_4")} Processors` },
				{ name: "Scalable 3", xeonSeries: 'Scalable_Gen_3', count: `${getCount("Scalable_Gen_3")} Processors` },
				{ name: "Scalable 2", xeonSeries: 'Scalable_Gen_2', count: `${getCount("Scalable_Gen_2")} Processors` },
				{ name: "Scalable 1", xeonSeries: 'Scalable_Gen_1', count: `${getCount("Scalable_Gen_1")} Processors` },
			]
		},
		{
			title: "E7 Family",
			data: [
				{ name: "E7 - V4", xeonSeries: 'E7_V4', count: `${getCount("E7_V4")} Processors` },
				{ name: "E7 - V3", xeonSeries: 'E7_V3', count: `${getCount("E7_V3")} Processors` },
				{ name: "E7 - V2", xeonSeries: 'E7_V2', count: `${getCount("E7_V2")} Processors` },
				{ name: "E7 - V1", xeonSeries: 'E7_V1', count: `${getCount("E7_V1")} Processors` },
			]
		},
		{
			title: "E5 Family",
			data: [
				{ name: "E5 - V4", xeonSeries: 'E5_V4', count: `${getCount("E5_V4")} Processors` },
				{ name: "E5 - V3", xeonSeries: 'E5_V3', count: `${getCount("E5_V3")} Processors` },
				{ name: "E5 - V2", xeonSeries: 'E5_V2', count: `${getCount("E5_V2")} Processors` },
				{ name: "E5 - V1", xeonSeries: 'E5_V1', count: `${getCount("E5_V1")} Processors` },
			]
		},
		{
			title: "E3 Family",
			data: [
				{ name: "E3 - V6", xeonSeries: 'E3_V6', count: `${getCount("E3_V6")} Processors` },
				{ name: "E3 - V5", xeonSeries: 'E3_V5', count: `${getCount("E3_V5")} Processors` },
				{ name: "E3 - V4", xeonSeries: 'E3_V4', count: `${getCount("E3_V4")} Processors` },
				{ name: "E3 - V3", xeonSeries: 'E3_V3', count: `${getCount("E3_V3")} Processors` },
				{ name: "E3 - V2", xeonSeries: 'E3_V2', count: `${getCount("E3_V2")} Processors` },
				{ name: "E3 - V1", xeonSeries: 'E3_V1', count: `${getCount("E3_V1")} Processors` },
			]
		}
	]

	return xeonSections
}