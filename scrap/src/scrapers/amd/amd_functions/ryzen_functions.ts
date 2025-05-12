import { MyUrl } from "../../../global/types"
import { Ryzen } from "../types"
import { getAmdProducts } from "./shared_functions"

export async function fetchAmdRyzenProcessors(url: MyUrl): Promise<Ryzen[]> {
    return await getAmdProducts(url) as Ryzen[]
}

/**
 * Filters and returns Ryzen processors which pass validation
 * @param ryzenProcessors An array of Ryzen Processors
 * @returns Validated Ryzen processors
 */
export function validateRyzenProcessors(ryzenProcessors: Record<string, any>[]): Record<string, any>[] {
    return ryzenProcessors.filter(ryzen => {
        return (
            (typeof(ryzen.name) == "string" || typeof(ryzen.name) == undefined) &&
            (typeof(ryzen.family) == "string" || typeof(ryzen.family) == undefined) &&
            (typeof(ryzen.series) == "string" || typeof(ryzen.series) == undefined) &&
            (typeof(ryzen.image) == "string" && ryzen.image != '')  &&
            
            typeof(ryzen.form_factor) == "string" || typeof(ryzen.form_factor) == undefined &&
            typeof(ryzen.market_segment) == "string" || typeof(ryzen.market_segment) == undefined &&
            typeof(ryzen.amd_pro_technologies) == "boolean" || typeof(ryzen.amd_pro_technologies) == undefined &&
            typeof(ryzen.regional_availability) == "string" || typeof(ryzen.regional_availability) == undefined &&
            typeof(ryzen.former_codename) == "string" || typeof(ryzen.former_codename) == undefined &&
            typeof(ryzen.architecture) == "string" || typeof(ryzen.architecture) == undefined &&
            typeof(ryzen.number_of_cpu_cores) == "number" &&
            ryzen.number_of_cpu_cores > 0 &&

            typeof(ryzen.multithreading_smt) == "boolean" || typeof(ryzen.multithreading_smt) == undefined  &&
            typeof(ryzen.number_of_threads) == "number" &&
            ryzen.number_of_threads > 0 &&

            typeof(ryzen.max_boost_clock) == "string" || typeof(ryzen.max_boost_clock) == undefined  &&
            typeof(ryzen.base_clock) == "string" || typeof(ryzen.base_clock) == undefined  &&
            typeof(ryzen.l1_cache) == "string" || typeof(ryzen.l1_cache) == undefined  &&
            typeof(ryzen.l2_cache) == "string" || typeof(ryzen.l2_cache) == undefined  &&
            typeof(ryzen.l3_cache) == "string" || typeof(ryzen.l3_cache) == undefined  &&
            typeof(ryzen.default_tdp) == "string" || typeof(ryzen.default_tdp) == undefined  &&
            typeof(ryzen.processor_technology_for_cpu_cores) == "string" || typeof(ryzen.processor_technology_for_cpu_cores) == undefined  &&
            typeof(ryzen.processor_technology_for_i_o_die) == "string" || typeof(ryzen.processor_technology_for_i_o_die) == undefined  &&
            typeof(ryzen.package_die_count) == "number" &&
            ryzen.package_die_count > 0 &&
            
            typeof(ryzen.unlocked_for_overclocking) == "boolean" || typeof(ryzen.unlocked_for_overclocking) == undefined  &&
            typeof(ryzen.amd_expo_memory_overclocking_technology) == "boolean" || typeof(ryzen.amd_expo_memory_overclocking_technology) == undefined  &&
            typeof(ryzen.precision_boost_overdrive) == "boolean" || typeof(ryzen.precision_boost_overdrive) == undefined  &&
            typeof(ryzen.curve_optimizer_voltage_offsets) == "boolean" || typeof(ryzen.curve_optimizer_voltage_offsets) == undefined  &&
            typeof(ryzen.amd_ryzen_master_support) == "boolean" || typeof(ryzen.amd_ryzen_master_support) == undefined  &&
            typeof(ryzen.cpu_socket) == "string" || typeof(ryzen.cpu_socket) == undefined  &&
            typeof(ryzen.supporting_chipsets) == "string" || typeof(ryzen.supporting_chipsets) == undefined  &&
            typeof(ryzen.cpu_boost_technology) == "string" || typeof(ryzen.cpu_boost_technology) == undefined  &&
            typeof(ryzen.instruction_set) == "string" || typeof(ryzen.instruction_set) == undefined  &&
            typeof(ryzen.supported_extensions) == "string" || typeof(ryzen.supported_extensions) == undefined  &&
            typeof(ryzen.thermal_solution_pib) == "string" || typeof(ryzen.thermal_solution_pib) == undefined  &&
            typeof(ryzen.recommended_cooler) == "string" || typeof(ryzen.recommended_cooler) == undefined  &&
            typeof(ryzen.max_operating_temperature_tjmax) == "string" || typeof(ryzen.max_operating_temperature_tjmax) == undefined  &&
            typeof(ryzen.launch_date) == "string" || typeof(ryzen.launch_date) == undefined  &&
            typeof(ryzen.os_support) == "string"
        )
    })
}