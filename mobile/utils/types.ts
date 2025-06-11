import { GraphicsBrand, IntelGenerationEnum, IntelProcessorLine, IntelUltraSeriesEnum, RyzenDesktopSeries, RyzenLaptopSeries } from "../../packages/types"

// Dashboard
export type DashboardCategoryType = "processors" | "graphics"
export enum DashboardCategoryTypeEnum { "Processors", "Graphics" }
export const DashboardCategoryTypeArray = [ "processors", "graphics" ]



// Categories | Brand | Make | Company => Page
export enum ProcessorsEnum { "AMD", "Intel" }
export const ProcessorsArray = [ "AMD", "Intel" ]


// Brand
export const RyzenDesktopSeriesArray = [ "9000 Series", "8000 Series", "7000 Series", "5000 Series", "4000 Series" ]
export const RyzenLaptopSeriesArray = [ "Ryzen Ai Max", "Ryzen Ai 300", "200 Ryzen", "9000 Ryzen", "8000 Ryzen", "7000 Ryzen", "6000 Ryzen" ]


export type ProductsBrandModel = 
	// AMD
	{ product: DashboardCategoryTypeEnum.Processors, brand?: ProcessorsEnum.AMD, series?: RyzenDesktopSeries | RyzenLaptopSeries } |
	
	// Intel
	{ product: DashboardCategoryTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Ultra, series?: IntelUltraSeriesEnum } |
	{ product: DashboardCategoryTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Core, generation?: IntelGenerationEnum } |


	{ product: DashboardCategoryTypeEnum.Graphics, brand?: GraphicsBrand.Ark } |
	{ product: DashboardCategoryTypeEnum.Graphics, brand?: GraphicsBrand.Nvidia } |
	{ product: DashboardCategoryTypeEnum.Graphics, brand?: GraphicsBrand.Radeon }
