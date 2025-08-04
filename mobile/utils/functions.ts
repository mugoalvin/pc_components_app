import { getTableRowCount } from "@/app/services/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IntelCore, IntelCoreUltra, Ryzen } from "../../packages/interfaces"
import { DatabaseTables, IntelGeneration } from "../../packages/types"
import { CoreDeviceChipsOptions, RyzenTierChipsOptions, SectionedDataItem } from "./types"

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

export function getSectionedRyzenData(ryzenProcessors: Ryzen[]): SectionedDataItem[] {
	function getCountPerSeries(series: string) {
		return ryzenProcessors.filter(ryzen => ryzen.series === series).length
	}

	const allSections = [
		{
			title: "High End",
			data: [
				{ name: "Ryzen 9000 Series", amdSeries: "Series9000", tableColumnData: "Ryzen 9000 Series", lastUpdated: "3 hrs ago", count: `${getCountPerSeries("Ryzen 9000 Series")} Processors` },
				{ name: "Ryzen 8000 Series", amdSeries: "Series8000", tableColumnData: "Ryzen 8000 Series", lastUpdated: "3 hrs ago", count: `${getCountPerSeries("Ryzen 8000 Series")} Processors` },
				{ name: "Ryzen 7000 Series", amdSeries: "Series7000", tableColumnData: "Ryzen 7000 Series", lastUpdated: "", count: `${getCountPerSeries("Ryzen 7000 Series")} Processors` }
			]
		},
		{
			title: "Mid-Range",
			data: [
				{ name: "Ryzen 6000 Series", amdSeries: "Ryzen6000", tableColumnData: "Ryzen 6000 Series", lastUpdated: "", count: `${getCountPerSeries("Ryzen 6000 Series")} Processors` },
				{ name: "Ryzen 5000 Series", amdSeries: "Series5000", tableColumnData: "Ryzen 5000 Series", lastUpdated: "", count: `${getCountPerSeries("Ryzen 5000 Series")} Processors` },
				{ name: "Ryzen 4000 Series", amdSeries: "Series4000", tableColumnData: "Ryzen 4000 Series", lastUpdated: "", count: `${getCountPerSeries("Ryzen 4000 Series")} Processors` }
			]
		},
		{
			title: "AI-Focused",
			data: [
				{ name: "Ryzen Ai Max", amdSeries: "RyzenAiMax", tableColumnData: "Ryzen AI Max", lastUpdated: "", count: `${getCountPerSeries("Ryzen AI Max 300 Series")} Processors` },
				{ name: "Ryzen Ai 300", amdSeries: "RyzenAi300", tableColumnData: "Ryzen AI 300 Series", lastUpdated: "", count: `${getCountPerSeries("Ryzen AI 300 Series")} Processors` }
			]
		}
	]

	const filteredSections = allSections.map(section => ({
		...section,
		data: section.data.filter(item => {
			const count = parseInt(item.count)
			return !isNaN(count) && count > 0
		})
	})).filter(section => section.data.length > 0)

	return filteredSections.length > 0
		? filteredSections
		: []
}



export function getSectionedUltraData(ultraProcessors: IntelCoreUltra[]): SectionedDataItem[] {
	function getCountPerSeries(line: string) {
		return ultraProcessors.filter(ultra => ultra.name?.includes(line) ).length
	}

	const allSections = [
		{
			title: "High-End",
			data: [
				{ name: "Ultra 9", lastUpdated: '', count: `${getCountPerSeries('Ultra 9')} Processors` },
			]
		},
		{
			title: "Upper Mid-Range",
			data: [
				{ name: "Ultra 7", lastUpdated: '', count: `${getCountPerSeries('Ultra 7')} Processors` },
			]
		},
		{
			title: "Entry/Mid-Range",
			data: [
				{ name: "Ultra 5", lastUpdated: '', count: `${getCountPerSeries('Ultra 5')} Processors` },
			]
		},
		{
			title: "Low-End",
			data: [
				{ name: "Ultra 3", lastUpdated: '', count: `${getCountPerSeries('Ultra 3')} Processors` },
			]
		}
	]

	const filteredSections = allSections.map(section => ({
		...section,
		data: Array.isArray(section.data)
			? section.data.filter(item => {
				const count = parseInt(item.count)
				return !isNaN(count) && count > 0
			})
			: []
	})).filter(section => section.data.length > 0)

	return filteredSections.length > 0
		? filteredSections
		: []
}


export function isIntelGenMatching(processor_number: string, gen: number): boolean {
	const match = processor_number.match(/-(\d+)/);
	if (!match) return false;

	const modelNumber = match[1];
	if (modelNumber.length < 2) return false;

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