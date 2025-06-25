import { GraphicsBrandEnum, IntelGenerationEnum, IntelProcessorLine, IntelUltraSeriesEnum, ProcessorsEnum, RyzenSeriesEnum } from "../../packages/types";

// Dashboard
export type DashboardCategoryType = "processors" | "graphics"
export enum ComponentTypeEnum { "Processors", "Graphics" }
export const DashboardCategoryTypeArray = [ "processors", "graphics" ]

export type SectionedRyzenDataItem = {
	title: string;
	data: {
		name: string;
		amdSeries: string;
		tableColumnData: string;
		lastUpdated: string;
		count: string;
	}[];
};


export type ProductBrandFilter =
	// AMD
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.AMD, amdSeries?: RyzenSeriesEnum } |

	// Intel
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Ultra, ultraSeries?: IntelUltraSeriesEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Core, generation?: IntelGenerationEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Xeon } |


	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Ark } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Nvidia } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Radeon }


export type RyzenTierChipsOptions = 'all' | '9' | '7' | '5' | '3'
export type RyzenDeviceChipsOptions = 'all' | 'desktop' | 'laptop'