export interface MyUrl {
    domain: string
    route: string
    tabIndex?: AmdScrape
}


export type DatabaseTables = "ark" | "core" | "radeon" | "ryzen" | "ultra" | "xeon" | "geforce"


// ==================================================> AMD <==================================================
export enum AmdScrape { Ryzen = 1, Radeon }
export enum AmdDevice { Desktop, Laptop }
export enum RyzenDesktopSeries { Series9000, Series8000, Series7000, Series5000, Series4000 }
export const RyzenDesktopSeriesArray = ["Series9000", "Series8000", "Series7000", "Series5000", "Series4000"]
export enum RyzenLaptopSeries { RyzenAiMax, RyzenAi300, Ryzen200, Ryzen9000, Ryzen8000, Ryzen7000, Ryzen6000 }
export const RyzenLaptopSeriesArray = ["RyzenAiMax", "RyzenAi300", "Ryzen200", "Ryzen9000", "Ryzen8000", "Ryzen7000", "Ryzen6000"]

export enum RyzenSeriesEnum { Series9000, Series8000, Series7000, Series5000, Series4000, RyzenAiMax, RyzenAi300, Ryzen200, Ryzen9000, Ryzen8000, Ryzen7000, Ryzen6000 }

// @ts-ignore
export enum RyzenSeriesNameEnum { "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 5000 Series", "Ryzen 4000 Series", "Ryzen AI Max 300 Series", "Ryzen AI 300 Series", "Ryzen 200 Series", "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 6000 Series" }
export const RyzenSeriesNameArray = ["Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 5000 Series", "Ryzen 4000 Series", "Ryzen AI Max 300 Series", "Ryzen AI 300 Series", "Ryzen 200 Series", "Ryzen 9000 Series", "Ryzen 8000 Series", "Ryzen 7000 Series", "Ryzen 6000 Series"]

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
export const IntelUltraTierArray = ['Ultra9', 'Ultra7', 'Ultra5', 'Ultra3']

// Core Processors
export type IntelTier = "i9" | "i7" | "i5" | "i3"
export enum IntelTierEnum { "i9" = "i9", "i7" = "i7", "i5" = "i5", "i3" = "i3" }
export type IntelGeneration = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4
export const intelTiers: IntelTier[] = ["i9", "i7", "i5", "i3"];
export const intelGenerations: IntelGeneration[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4]
export enum IntelGenerationEnum { 'gen14' = 14, 'gen13' = 13, 'gen12' = 12, 'gen11' = 11, 'gen10' = 10, 'gen9' = 9, 'gen8' = 8, 'gen7' = 7, 'gen6' = 6, 'gen5' = 5, 'gen4' = 4 }
export type IntelCoreScrapingOptions = {
    tier: IntelTier,
    generation: IntelGeneration
}

// Xeon Processors
export enum IntelXeonSeries { Xeon6, Scalable_Gen_5, Scalable_Gen_4, Scalable_Gen_3, Scalable_Gen_2, Scalable_Gen_1, CPU_Max, E, W, D, E7_v4, E7_v3, E7_v2, E7_v1, E5_v4, E5_v3, E5_v2, E5_v1, E3_v6, E3_v5, E3_v4, E3_v3, E3_v2, E3_v1 }
export const IntelXeonSeriesArray = [
    { label: "Xeon 6", serie: "Xeon6" },
    { label: "Scalable Gen 5", serie: "Scalable_Gen_5" },
    { label: "Scalable Gen 4", serie: "Scalable_Gen_4" },
    { label: "Scalable Gen 3", serie: "Scalable_Gen_3" },
    { label: "Scalable Gen 2", serie: "Scalable_Gen_2" },
    { label: "Scalable Gen 1", serie: "Scalable_Gen_1" },
    { label: "CPU Max", serie: "CPU_Max" },
    { label: "Xeon E", serie: "E" },
    { label: "Xeon W", serie: "W" },
    { label: "Xeon D", serie: "D" },
    { label: "E7 v4", serie: "E7_v4" },
    { label: "E7 v3", serie: "E7_v3" },
    { label: "E7 v2", serie: "E7_v2" },
    { label: "E7 v1", serie: "E7_v1" },
    { label: "E5 v4", serie: "E5_v4" },
    { label: "E5 v3", serie: "E5_v3" },
    { label: "E5 v2", serie: "E5_v2" },
    { label: "E5 v1", serie: "E5_v1" },
    { label: "E3 v6", serie: "E3_v6" },
    { label: "E3 v5", serie: "E3_v5" },
    { label: "E3 v4", serie: "E3_v4" },
    { label: "E3 v3", serie: "E3_v3" },
    { label: "E3 v2", serie: "E3_v2" },
    { label: "E3 v1", serie: "E3_v1" },
]
export type IntelXeonSeriesType = "Xeon6" | "Scalable_Gen_5" | "Scalable_Gen_4" | "Scalable_Gen_3" | "Scalable_Gen_2" | "Scalable_Gen_1" | "CPU_Max" | "E" | "W" | "D" | "E7_v4" | "E7_v3" | "E7_v2" | "E7_v1" | "E5_v4" | "E5_v3" | "E5_v2" | "E5_v1" | "E3_v6" | "E3_v5" | "E3_v4" | "E3_v3" | "E3_v2" | "E3_v1"


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