import { DatabaseTables } from "../../../packages/types";

export const graphicsBrandsArray = [
	{
		name: "Intel Ark",
		tableNames: 'ark' as DatabaseTables,
		logoImage: "https://static.wikia.nocookie.net/logopedia/images/8/84/Intel_Arc_Badge.png/revision/latest/scale-to-width-down/1000?cb=20230618181757",
		enumName: "Ark"
	},
	{
		name: "Nvidia",
		tableNames: "geforce" as DatabaseTables,
		logoImage: require("../../assets/images/nvidia_logo.png"),
		enumName: "Nvidia"
	},
	{
		name: "AMD Radeon",
		tableNames: 'radeon' as DatabaseTables,
		logoImage: require("../../assets/images/radeon_logo.png"),
		enumName: "Radeon"
	}
]