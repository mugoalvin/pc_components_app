import { GraphicsBrandEnum, IntelGenerationEnum, IntelProcessorLine, IntelUltraSeriesEnum, IntelUltraTierEnum, IntelXeonSeries, ProcessorsEnum, RadeonEnum, RadeonRXSeriesEnum, RyzenSeriesEnum } from "../../packages/types";

// Dashboard
export type DashboardCategoryType = "processors" | "graphics"
export enum ComponentTypeEnum { "Processors", "Graphics" }
export const DashboardCategoryTypeArray = ["processors", "graphics"]

export type SectionedDataItem = {
	title: string;
	data: {
		name: string;
		amdSeries?: string;
		xeonSeries?: string;
		line?: string
		generation?: string
		tableColumnData?: string;
		lastUpdated?: string;
		count?: string;
		device?: string
		dbLike?: string
	}[];
};


export type ProductBrandFilter =
	// AMD
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.AMD, amdSeries?: RyzenSeriesEnum } |

	// Intel
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Ultra, ultraSeries?: IntelUltraSeriesEnum, ultraTier?: IntelUltraTierEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Core, generation?: IntelGenerationEnum } |
	{ selectedComponent: ComponentTypeEnum.Processors, brand?: ProcessorsEnum.Intel, line?: IntelProcessorLine.Xeon, xeonSeries?: IntelXeonSeries } |


	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Ark } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Nvidia } |


	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Radeon, radeonLine?: RadeonEnum.RadeonPro } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Radeon, radeonLine?: RadeonEnum.RadeonRX, series?: RadeonRXSeriesEnum } |
	{ selectedComponent: ComponentTypeEnum.Graphics, brand?: GraphicsBrandEnum.Radeon, radeonLine?: RadeonEnum.RadeonMobile }


export type RyzenTierChipsOptions = 'all' | '9' | '7' | '5' | '3'
export type RyzenDeviceChipsOptions = 'all' | 'desktop' | 'laptop'
export type RadeonDeviceChipsOptions = 'all' | 'desktop' | 'component'
export type UltraDeviceChipsOptions = 'all' | 'desktop' | 'mobile' | 'embedded'
export type UltraSeriesChipsOptions = 'all' | 'series 2' | 'series 1'
export type CoreDeviceChipsOptions = UltraDeviceChipsOptions
export type CoreTierChipOptions = 'all' | 'i9' | 'i7' | 'i5' | 'i3'
export type XeonChipsOptions = 'all' | 'embedded' | 'server'