export enum RyzenSeries { Series9000, Series8000, Series7000, Series5000, Series4000 }
export enum RadeonSeries { Series9000, Series7000, Series6000 }

export interface InitialAmdProps {
	product_name: string
	product_link: string
}

export interface Ryzen {
	name?: string
	family?: string
	series?: string
	image?: string
	form_factor?: string
	market_segment?: string
	amd_pro_technologies?: boolean
	regional_availability?: string
	former_codename?: string
	architecture?: string
	number_of_cpu_cores?: number
	multithreading_smt?: boolean
	number_of_threads?: number
	max_boost_clock?: string
	base_clock?: string
	l1_cache?: string
	l2_cache?: string
	l3_cache?: string
	default_tdp?: string
	processor_technology_for_cpu_cores?: string
	processor_technology_for_i_o_die?: string
	package_die_count?: number
	unlocked_for_overclocking?: boolean
	amd_expo_memory_overclocking_technology?: boolean
	precision_boost_overdrive?: boolean
	curve_optimizer_voltage_offsets?: boolean
	amd_ryzen_master_support?: boolean
	cpu_socket?: string
	supporting_chipsets?: string[]
	cpu_boost_technology?: string
	instruction_set?: string
	supported_extensions?: string[]
	thermal_solution_pib?: string
	recommended_cooler?: string
	max_operating_temperature_tjmax?: string
	launch_date?: string
	os_support?: string[]
}


export interface Radeon {
	image?: string
	link?: string
	name?: string
	family?: string
	series?: string
	board_type?: string
	os_support?: string[]
	additional_power_connector?: string
	compute_units?: number
	boost_frequency?: string
	game_frequency?: string
	base_frequency?: string
	ray_accelerators?: number
	ai_accelerators?: number
	peak_pixel_fill_rate?: string
	peak_texture_fill_rate?: string
	peak_half_precision_compute_performance?: string
	peak_single_precision_compute_performance?: string
	peak_int4_performance?: string
	peak_int8_performance?: string
	rops?: number
	stream_processors?: number
	texture_units?: number
	transistor_count?: string
	typical_board_power_desktop?: string
	minimum_psu_recommendation?: string
	recommended_power_supply?: string
	amd_infinity_cache_technology?: string
	memory_speed?: string
	max_memory_size?: string
	memory_type?: string
	memory_interface?: string
	memory_bandwidth?: string
	effective_memory_bandwidth?: string
	hdmi_4k_support?: boolean
	"4k_h264_decode"?: boolean
	"4k_h264_encode"?: boolean
	h265_hevc_decode?: boolean
	h265_hevc_encode?: boolean
	av1_decode?: boolean
	av1_encode?: boolean
	displayport?: string
	hdmi?: string
	usb_type_c?: boolean
	length?: string
	slots?: number
	launch_date?: string
	supported_technologies?: string
}