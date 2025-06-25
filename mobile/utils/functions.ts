import { getTableRowCount } from "@/app/services/fetch"
import { Ryzen } from "../../packages/interfaces"
import { DatabaseTables } from "../../packages/types"
import { RyzenTierChipsOptions } from "./types"

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


export function getSectionedRyzenData(ryzenProcessors: Ryzen[]) {
	function getCountPerSeries(series: string) {
		return ryzenProcessors.filter(ryzen => ryzen.series === series).length
	}

	return [
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
}