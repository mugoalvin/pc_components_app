import { z } from "zod";

import { Radeon } from "../../../../../packages/interfaces";
import { MyUrl, RadeonSeriesEnum } from "../../../../../packages/types";
import { getAmdProducts } from './shared_functions';

export async function getAmdRadeonRx(url: MyUrl, serie?: RadeonSeriesEnum): Promise<Radeon[]> {
	return await getAmdProducts(url, serie) as Radeon[]
}

// Define the Zod schema for Radeon
const RadeonSchema = z.object({
	image: z.string().optional(),
	link: z.string().optional(),
	name: z.string().optional(),
	family: z.string().optional(),
	series: z.string().optional(),
	board_type: z.string().optional(),
	os_support: z.string().optional(),
	additional_power_connector: z.string().optional(),
	compute_units: z.number().optional(),
	boost_frequency: z.string().optional(),
	game_frequency: z.string().optional(),
	base_frequency: z.string().optional(),
	ray_accelerators: z.number().optional(),
	ai_accelerators: z.number().optional(),
	peak_pixel_fill_rate: z.string().optional(),
	peak_texture_fill_rate: z.string().optional(),
	peak_half_precision_compute_performance: z.string().optional(),
	peak_single_precision_compute_performance: z.string().optional(),
	peak_int4_performance: z.string().optional(),
	peak_int8_performance: z.string().optional(),
	rops: z.number().optional(),
	stream_processors: z.number().optional(),
	texture_units: z.number().optional(),
	transistor_count: z.string().optional(),
	typical_board_power_desktop: z.string().optional(),
	minimum_psu_recommendation: z.string().optional(),
	recommended_power_supply: z.string().optional(),
	amd_infinity_cache_technology: z.string().optional(),
	memory_speed: z.string().optional(),
	max_memory_size: z.string().optional(),
	memory_type: z.string().optional(),
	memory_interface: z.string().optional(),
	memory_bandwidth: z.string().optional(),
	effective_memory_bandwidth: z.string().optional(),
	hdmi_4k_support: z.boolean().optional(),
	"4k_h264_decode": z.boolean().optional(),
	"4k_h264_encode": z.boolean().optional(),
	h265_hevc_decode: z.boolean().optional(),
	h265_hevc_encode: z.boolean().optional(),
	av1_decode: z.boolean().optional(),
	av1_encode: z.boolean().optional(),
	displayport: z.string().optional(),
	hdmi: z.string().optional(),
	usb_type_c: z.boolean().optional(),
	length: z.string().optional(),
	slots: z.number().optional(),
	launch_date: z.string().optional(),
	supported_technologies: z.string().optional(),
})

// Validation function
export function validateRadeonRxGraphics(radeonRxGraphicsCards: Radeon[]) {
	return radeonRxGraphicsCards.filter(radeon => {
		const result = RadeonSchema.safeParse(radeon)
		return result.success
	})
}