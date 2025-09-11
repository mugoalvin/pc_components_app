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


export const radeonBrandsArray = [
	{
		name: "Radeon PRO",
		// tableNames: 'ark' as DatabaseTables,
		logoImage: "https://upload.wikimedia.org/wikipedia/commons/1/1f/AMD_Radeon_Pro_Logo.png?20210215042035",
		// logoImage: "https://upload.wikimedia.org/wikipedia/commons/9/96/Radeon_Pro_Logo.png",
		enumName: "RadeonPro"
	},
	{
		name: "Radeon RX",
		tableNames: "radeon" as DatabaseTables,
		logoImage:  "https://www.vhv.rs/dpng/d/84-848904_rx-symbol-in-pharmacy-hd-png-download.png",
		enumName: "RadeonRX"
	},
	{
		name: "Radeon Mobile",
		tableNames: 'radeon' as DatabaseTables,
		logoImage: "https://play-lh.googleusercontent.com/PQkSVrOFMU8hqSgZ7HZ6a9-HV_Hd2-ablixYSL5O1XT915dieaDZetVbaV2xlCgQDw=w240-h480-rw",
		enumName: "RadeonMobile"
	}
]