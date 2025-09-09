import { IntelCore, IntelCoreUltra, IntelXeon } from "../../../packages/interfaces";
import { DatabaseTables, IntelProcessorLine } from "../../../packages/types";

export const processorsBrandsArray = [
	{
		name: "AMD",
		tableNames: 'ryzen' as DatabaseTables,
		logoImage: require('../../assets/images/amd_logo.png'),
	},
	{
		name: "Intel",
		tableNames: ['core', 'ultra', "xeon"] as DatabaseTables[],
		logoImage: require("../../assets/images/intel_logo.png"),
	}
]


export const intelProcessorFamilies = [
	{
		name: "Ultra",
		tables: "ultra" as DatabaseTables,
		image: "http://alitech.io/wp-content/uploads/2023/12/Unleashing-Intels-Core-Ultra-CPUs-A-Deep-Dive-into-the-Future-of-Processing-Power5-300x225.png",
		line: IntelProcessorLine.Ultra
	},
	{
		name: "Core",
		tables: "core" as DatabaseTables,
		image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Intel_Core_i9_Logo_2020.png?20210405130213",
		line: IntelProcessorLine.Core
	},
	{
		name: "Xeon",
		tables: "xeon" as DatabaseTables,
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Intel-Xeon-Badge-2024.jpg/250px-Intel-Xeon-Badge-2024.jpg",
		line: IntelProcessorLine.Xeon
	}
]


export function getIntelCoreSpecs(intel: IntelCore): Record<string, any>[] {
	return [{
		title: "Cores",
		info: intel.total_cores
	},
	{
		title: "Threads",
		info: intel.total_threads
	},
	{
		title: "Max Turbo Clock",
		info: String(intel.max_turbo_frequency).replace(/^\s*up to\s*/i, ""),
	},
	{
		title: "Cache",
		info: intel.cache?.split(" ").slice(0).slice(0, 2).join(" ")
	},]
}


export function getIntelUltraSpecs(intel: IntelCoreUltra): Record<string, any>[] {
	return [{
		title: "Performance Cores",
		info: intel.number_of_performance_cores
	},
	{
		title: "Threads",
		info: intel.total_threads
	},
	{
		title: "Max Turbo Clock",
		info: String(intel.max_turbo_frequency).replace(/^\s*up to\s*/i, ""),
	},
	{
		title: "Xe-cores",
		info: intel.xe_cores,
	}
	]
}

export function getIntelXeonSpecs(intel: IntelXeon): Record<string, any>[] {
	return [{
		title: "max_number_of_upi_links",
		info: intel.max_number_of_upi_links,
	}
	]
}