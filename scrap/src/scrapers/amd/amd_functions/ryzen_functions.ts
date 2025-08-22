import { z } from 'zod'
import { Ryzen } from "../../../../../packages/interfaces"
import { MyUrl, RyzenDesktopSeries, RyzenLaptopSeries } from "../../../../../packages/types"
import { getAmdProducts } from "./shared_functions"

export async function fetchAmdRyzenProcessors(url: MyUrl, serie?: RyzenDesktopSeries | RyzenLaptopSeries): Promise<Ryzen[]> {
	return await getAmdProducts(url, serie) as Ryzen[]
}

const RyzenScheme = z.object({
	name: z.string().optional(),
	family: z.string().optional(),
	series: z.string().optional(),
	image: z.string().optional(),
	device: z.string().optional(),
	form_factor: z.string().optional(),
	market_segment: z.string().optional(),
	amd_pro_technologies: z.boolean().optional(),
	regional_availability: z.string().optional(),
	former_codename: z.string().optional(),
	architecture: z.string().optional(),
	number_of_cpu_cores: z.number().optional(),
	multithreading_smt: z.boolean().optional(),
	number_of_threads: z.number().optional(),
	max_boost_clock: z.string().optional(),
	base_clock: z.string().optional(),
	l1_cache: z.string().optional(),
	l2_cache: z.string().optional(),
	l3_cache: z.string().optional(),
	default_tdp: z.string().optional(),
	processor_technology_for_cpu_cores: z.string().optional(),
	processor_technology_for_i_o_die: z.string().optional(),
	package_die_count: z.number().optional(),
	unlocked_for_overclocking: z.boolean().optional(),
	amd_expo_memory_overclocking_technology: z.boolean().optional(),
	precision_boost_overdrive: z.boolean().optional(),
	curve_optimizer_voltage_offsets: z.boolean().optional(),
	amd_ryzen_master_support: z.boolean().optional(),
	cpu_socket: z.string().optional(),
	supporting_chipsets: z.string().optional(),
	cpu_boost_technology: z.string().optional(),
	instruction_set: z.string().optional(),
	supported_extensions: z.string().optional(),
	thermal_solution_pib: z.string().optional(),
	recommended_cooler: z.string().optional(),
	max_operating_temperature_tjmax: z.string().optional(),
	launch_date: z.string().optional(),
	os_support: z.string().optional()
})

/**
 * Filters and returns Ryzen processors which pass validation
 * @param ryzenProcessors An array of Ryzen Processors
 * @returns Validated Ryzen processors
 */
export function validateRyzenProcessors(ryzenProcessors: Record<string, any>[]): Record<string, any>[] {
	// return ryzenProcessors
	const values = ryzenProcessors.filter(ryzen => {
		const results = RyzenScheme.safeParse(ryzen)
		return results.success
	})

	return values
}