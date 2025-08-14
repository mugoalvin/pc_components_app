import { DatabaseTables } from "../../../packages/types";

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