import { GraphicsBrandEnum, IntelGenerationEnum, IntelProcessorLine, IntelUltraSeriesEnum, IntelUltraTierEnum, ProcessorsEnum, RyzenSeriesEnum } from "../../packages/types";

// Dashboard
export type DashboardCategoryType = "processors" | "graphics"
export enum ComponentTypeEnum { "Processors", "Graphics" }
export const DashboardCategoryTypeArray = [ "processors", "graphics" ]

export type SectionedDataItem = {
	title: string;
	data: {
		name: string;
		amdSeries?: string;
		line?: string
		tableColumnData?: string;
		lastUpdated?: string;
		count?: string;
	}[];
};


export type ProductBrandFilter =
	// AMD
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.AMD, amdSeries?: RyzenSeriesEnum } |

	// Intel
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Ultra, ultraSeries?: IntelUltraSeriesEnum, ultraTier?: IntelUltraTierEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Core, generation?: IntelGenerationEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Xeon } |


	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Ark } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Nvidia } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Radeon }


export type RyzenTierChipsOptions = 'all' | '9' | '7' | '5' | '3'
export type RyzenDeviceChipsOptions = 'all' | 'desktop' | 'laptop'
export type UltraDeviceChipsOptions = 'all' | 'desktop' | 'mobile' | 'embedded'
export type UltraSeriesChipsOptions = 'all' | 'series 2' | 'series 1'