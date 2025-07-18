export interface MyUrl {
	domain: string
	route: string
	tabIndex?: AmdScrape
}


export type DatabaseTables = "ark" | "core" | "radeon" | "ryzen" | "ultra" | "geforce"


// ==================================================> AMD <==================================================
export enum AmdScrape { Ryzen = 1, Radeon }
export enum AmdDevice { Desktop, Laptop }
export enum RyzenDesktopSeries { Series9000, Series8000, Series7000, Series5000, Series4000 }
export enum RyzenLaptopSeries { RyzenAiMax, RyzenAi300, Ryzen200, Ryzen9000, Ryzen8000, Ryzen7000, Ryzen6000 }
export const RyzenLaptopArray = ["RyzenAiMax", "RyzenAi300", "Ryzen200", "Ryzen9000", "Ryzen8000", "Ryzen7000", "Ryzen6000"]

export enum RyzenSeriesEnum { Series9000, Series8000, Series7000, Series5000, Series4000, RyzenAiMax, RyzenAi300, Ryzen200, Ryzen9000, Ryzen8000, Ryzen7000, Ryzen6000 }

// @ts-ignore
export enum RyzenSeriesNameEnum { "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 5000 Series", "Ryzen 4000 Series", "Ryzen AI Max 300 Series", "Ryzen AI 300 Series", "Ryzen 200 Series", "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 6000 Series" }
export const RyzenSeriesNameArray = [ "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 5000 Series", "Ryzen 4000 Series", "Ryzen AI Max 300 Series", "Ryzen AI 300 Series", "Ryzen 200 Series", "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 6000 Series" ]

export const RyzenSeriesArray = ["Series9000", "Series8000", "Series7000", "Series5000", "Series4000", "RyzenAiMax", "RyzenAi300", "Ryzen200", "Ryzen9000", "Ryzen8000", "Ryzen7000", "Ryzen6000"]
export type RyzenSeriesType = "Series9000" | "Series8000" | "Series7000" | "Series5000" | "Series4000" | "RyzenAiMax" | "RyzenAi300" | "Ryzen200" | "Ryzen9000" | "Ryzen8000" | "Ryzen7000" | "Ryzen6000"

export enum RadeonSeriesEnum { Series9000, Series7000, Series6000 }




// =================================================> Intel <=================================================
export enum IntelProducts { Processors, Graphics }
export enum IntelProcessorLine { Ultra, Core, IntelProcessor, Xeon, Atom, Pentium, Celeron }

// Ultra Processors
export type IntelUltraSeries = "Series 1" | "Series 2"
export enum IntelUltraSeriesEnum { Serie1 = "Series 1", Serie2 = "Series 2" }
export const IntelUltraSeriesValues = ["Series 1", "Series 2"] as const;

export enum IntelUltraTierEnum { Ultra9, Ultra7, Ultra5, Ultra3 }
export const IntelUltraTierArray = [ 'Ultra9', 'Ultra7', 'Ultra5', 'Ultra3' ]

// Core Processors
export type IntelTier = "i9" | "i7" | "i5" | "i3"
export enum IntelTierEnum { "i9" = "i9", "i7" = "i7", "i5" = "i5", "i3" = "i3" }
export type IntelGeneration = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4
export const intelTiers: IntelTier[] = ["i9", "i7", "i5", "i3"];
export const intelGenerations: IntelGeneration[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4]
export enum IntelGenerationEnum { 'gen14' = 14, 'gen13' = 13, 'gen12' = 12, 'gen11' = 11, 'gen10' = 10, 'gen9' = 9, 'gen8' = 8, 'gen7' = 7, 'gen6' = 6, 'gen5' = 5, 'gen4' = 4}
export type IntelCoreScrapingOptions = {
    tier: IntelTier,
    generation: IntelGeneration
}

// Ark Graphics
export enum IntelGraphics { Ark, ArkPro, DataCenter }

export enum ArkSeries { B_Series, A_Series }
export enum ArkProSeries { A_Series }
export enum DataCenterSeries { Max_Series, Flex_Series }

export type IntelGraphicsScrapingOptions = 
    { family: IntelGraphics.Ark, series: ArkSeries } |
    { family: IntelGraphics.ArkPro, series: ArkProSeries } |
    { family: IntelGraphics.DataCenter, series: DataCenterSeries }


// ================================================> Nvidia <================================================
export enum NvidiaGeforceSeries { 
    Series50 = 'compare-50',
    Series40 = 'compare-40',
    Series30 = 'compare-specs',
    Series20 = 'compare-20',
    Series16 = 'compare-16'
}





// ================================================> Processors <================================================
export enum ProcessorsEnum { "AMD", "Intel" }
export const ProcessorsArray = ["AMD", "Intel"]



// ================================================> Graphics <================================================
export enum GraphicsBrandEnum { "Ark", "Nvidia", "Radeon" }
export const GraphicsBrandArray = ["Intel Ark", "Nvidia", "AMD Radeon"]