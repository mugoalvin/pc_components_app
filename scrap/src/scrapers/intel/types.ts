export interface IntelFamily {
	familyName: string
	familyLink: string
}

export interface InitialIntelProps {
	name: string
	link: string
}

export enum IntelProducts { Processors, Graphics }

// =============================================================Intel Processors=============================================================
export enum Processors {Ultra, Core, IntelProcessor, Xeon, Atom, Pentium, Celeron}

// Ultra Processors
export type IntelUltraSeries = "Series 1" | "Series 2"
export enum IntelUltraSeriesEnum { Serie1 = "Series 1", Serie2 = "Series 2" }
export const IntelUltraSeriesValues = ["Series 1", "Series 2"] as const;

// Core Processors
export type IntelTier = "i9" | "i7" | "i5" | "i3"
export type IntelGeneration = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4
export const intelTiers: IntelTier[] = ["i9", "i7", "i5", "i3"];
export const intelGenerations: IntelGeneration[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4]
export type IntelCoreScrapingOptions = {
    tier: IntelTier,
    generation: IntelGeneration
}
// ==========================================================================================================================================


// ==============================================================Intel Graphics==============================================================
export enum IntelGraphics { Ark, ArkPro, DataCenter }

export enum ArkSeries { B_Series, A_Series }
export enum ArkProSeries { A_Series }
export enum DataCenterSeries { Max_Series, Flex_Series }

export type IntelGraphicsScrapingOptions = 
    { family: IntelGraphics.Ark, series: ArkSeries } |
    { family: IntelGraphics.ArkPro, series: ArkProSeries } |
    { family: IntelGraphics.DataCenter, series: DataCenterSeries }

// ==========================================================================================================================================


export interface IntelCoreUltra {
    name?: string;
    code_name?: string;
    vertical_segment?: string;
    series?: string
    processor_number?: string;
    overall_peak_tops_int8?: number;
    recommended_customer_price?: string;
    number_of_performance_cores?: number;
    number_of_efficient_cores?: number;
    number_of_low_power_efficient_cores?: number;
    total_threads?: number;
    max_turbo_frequency?: string;
    intel_turbo_boost_max_technology_3_0_frequency?: string;
    performance_core_max_turbo_frequency?: string;
    efficient_core_max_turbo_frequency?: string;
    low_power_efficient_core_max_turbo_frequency?: string;
    performance_core_base_frequency?: string;
    efficient_core_base_frequency?: string;
    low_power_efficient_core_base_frequency?: string;
    cache?: string;
    total_l2_cache?: string;
    processor_base_power?: string;
    maximum_turbo_power?: string;
    minimum_assured_power?: string;
    intel_deep_learning_boost_intel_dl_boost_on_cpu?: boolean;
    ai_software_frameworks_supported_by_cpu?: string[];
    cpu_lithography?: string;
    lithography?: string;
    launch_date?: string;
    embedded_options_available?: boolean;
    product_tuning_embedded_uses?: boolean;
    use_conditions?: string | string[];
    datasheet?: string;
    memory_types?: string;
    maximum_memory_speed?: string;
    max_number_of_memory_channels?: number;
    ecc_memory_supported?: boolean;
    graphics_base_frequency?: string;
    graphics_max_dynamic_frequency?: string;
    gpu_peak_tops_int8?: number;
    graphics_output?: string[];
    xe_cores?: number;
    ray_tracing?: boolean;
    max_resolution_hdmi?: string;
    max_resolution_dp?: string;
    max_resolution_edp_integrated_flat_panel?: string;
    directx_support?: number;
    opengl_support?: number;
    opencl_support?: number;
    multi_format_codec_engines?: number;
    h_264_hardware_encode_decode?: boolean;
    h_265_hevc_hardware_encode_decode?: boolean;
    h_266_vvc_hardware_encode_decode?: string;
    av1_encode_decode?: boolean;
    vp9_bitstream_decoding?: boolean;
    intel_quick_sync_video?: boolean;
    number_of_displays_supported?: number;
    device_id?: string;
    intel_deep_learning_boost_intel_dl_boost_on_gpu?: boolean;
    ai_software_frameworks_supported_by_gpu?: string[];
    npu_peak_tops_int8?: number;
    sparsity_support?: boolean;
    windows_studio_effects_support?: boolean;
    ai_software_frameworks_supported_by_npu?: string[];
    pci_support?: string | number;
    pci_express_configurations?: string[];
    max_number_of_pci_express_lanes?: number;
    max_number_of_dmi_lanes?: number;
    scalability?: string;
    pci_express_revision?: string;
    thermal_solution_specification?: string;
    max_operating_temperature?: string;
    package_size?: string;
    intel_gaussian_neural_accelerator?: number;
    intel_thread_director?: boolean;
    intel_image_processing_unit?: number;
    intel_smart_sound_technology?: boolean;
    intel_wake_on_voice?: boolean;
    intel_high_definition_audio?: boolean;
    intel_adaptix_technology?: boolean;
    intel_speed_shift_technology?: boolean;
    intel_turbo_boost_max_technology_3_0?: boolean;
    intel_turbo_boost_technology?: number;
    intel_thermal_velocity_boost?: boolean;
    intel_64?: boolean;
    instruction_set?: string;
    instruction_set_extensions?: string[];
    idle_states?: boolean;
    enhanced_intel_speedstep_technology?: boolean;
    thermal_monitoring_technologies?: boolean;
    intel_vpro_security_eligibility?: boolean;
    intel_hardware_shield_eligibility?: boolean;
    intel_partner_security_engine?: boolean;
    intel_threat_detection_technology_tdt?: boolean;
    intel_active_management_technology_amt?: boolean;
    intel_standard_manageability_ism?: boolean;
    intel_remote_platform_erase_rpe?: boolean;
    intel_one_click_recovery?: boolean;
    intel_control_flow_enforcement_technology?: boolean;
    intel_total_memory_encryption_multi_key?: boolean;
    intel_aes_new_instructions?: boolean;
    secure_key?: boolean;
    intel_trusted_execution_technology?: boolean;
    execute_disable_bit?: boolean;
    intel_os_guard?: boolean;
    intel_boot_guard?: boolean;
    mode_based_execute_control_mbec?: boolean;
    intel_stable_it_platform_program_sipp?: boolean;
    intel_virtualization_technology_with_redirect_protection_vt_rp?: boolean;
    intel_virtualization_technology_vt_x?: boolean;
    intel_virtualization_technology_for_directed_i_o_vt_d?: boolean;
    intel_vt_x_with_extended_page_tables_ept?: boolean;
    max_cpu_configuration?: number;
    intel_hyper_threading_technology?: boolean
}

export interface IntelCore {
    name?: string
	code_name?: string
	vertical_segment?: string
	processor_number?: string
	lithography?: string
	recommended_customer_price?: string
	number_of_performance_cores?: number
	number_of_efficient_cores?: number
	total_threads?: number
	max_turbo_frequency?: string
	intel_turbo_boost_max_technology_3_0_frequency?: string
	performance_core_max_turbo_frequency?: string
	efficient_core_max_turbo_frequency?: string
	performance_core_base_frequency?: string
	efficient_core_base_frequency?: string
	cache?: string
	total_l2_cache?: string
	processor_base_power?: string
	maximum_turbo_power?: string
	launch_date?: string
	embedded_options_available?: boolean
	use_conditions?: string | string[]
	datasheet?: string
	memory_types?: string
	max_number_of_memory_channels?: number
	max_memory_bandwidth?: string
	max_number_of_dmi_lanes?: number
	scalability?: string
	pci_express_revision?: string
	pci_express_configurations?: string[]
	max_number_of_pci_express_lanes?: number
	max_cpu_configuration?: number
	thermal_solution_specification?: string
	tjunction?: string
	package_size?: string
	max_operating_temperature?: string
	intel_gaussian_neural_accelerator?: number
	intel_thread_director?: boolean
	intel_deep_learning_boost_intel_dl_boost_on_cpu?: boolean
	intel_speed_shift_technology?: boolean
	intel_turbo_boost_max_technology_3_0?: boolean
	intel_turbo_boost_technology?: number
	intel_hyper_threading_technology?: boolean
	intel_64?: boolean
	instruction_set?: string
	instruction_set_extensions?: string[]
	idle_states?: boolean
	enhanced_intel_speedstep_technology?: boolean
	thermal_monitoring_technologies?: boolean
	intel_control_flow_enforcement_technology?: boolean
	intel_aes_new_instructions?: boolean
	secure_key?: boolean
	intel_os_guard?: boolean
	execute_disable_bit?: boolean
	intel_boot_guard?: boolean
	mode_based_execute_control_mbec?: boolean
	intel_virtualization_technology_vt_x?: boolean
	intel_virtualization_technology_for_directed_i_o_vt_d?: boolean
	intel_vt_x_with_extended_page_tables_ept?: boolean
    intel_thermal_velocity_boost_frequency?: string
    tdp?: string
    ecc_memory_supported?: boolean
    graphics_base_frequency?: string
    graphics_max_dynamic_frequency?: string
    graphics_output?: string[]
    execution_units?: number
    max_resolution_hdmi?: string
    max_resolution_dp?: string
    max_resolution_edp_integrated_flat_panel?: string
    directx_support?: number
    opengl_support?: number
    opencl_support?: number
    multi_format_codec_engines?: number
    intel_quick_sync_video?: boolean
    intel_clear_video_hd_technology?: boolean
    number_of_displays_supported?: number
    device_id?: string
    intel_volume_management_device_vmd?: boolean
    intel_adaptive_boost_technology?: boolean
    intel_thermal_velocity_boost?: boolean
    intel_hardware_shield_eligibility?: boolean
    intel_threat_detection_technology_tdt?: boolean
    intel_active_management_technology_amt?: boolean
    intel_standard_manageability_ism?: boolean
    intel_remote_platform_erase_rpe?: boolean
    intel_one_click_recovery?: boolean
    intel_total_memory_encryption_multi_key?: boolean
    intel_trusted_execution_technology?: boolean
    intel_stable_it_platform_program_sipp?: boolean
    intel_virtualization_technology_with_redirect_protection_vt_rp?: boolean
}



export interface IntelArk {
    name?: string
    model_number?: string
    code_name?: string
    microarchitecture?: string
    lithography_type?: string
    vertical_segment?: string
    marketing_status?: string
    launch_date?: string
    embedded_options_available?: boolean
    render_slices?: number
    ray_tracing_units?: number
    intel_xe_matrix_extensions_intel_xmx_engines?: number
    xe_vector_engines?: number
    graphics_clock?: string
    gpu_peak_tops_int8?: number
    tbp?: string
    pci_express_configurations?: string[]
    device_id?: string
    graphics_memory_interface?: string
    graphics_memory_bandwidth?: string
    graphics_memory_speed?: string
    graphics_output?: string[]
    hdmi_variable_refresh_rate_vrr?: boolean
    vesa_adaptive_sync?: boolean
    media_profiles?: string[]
    max_resolution_hdmi?: string
    max_resolution_dp?: string
    h_265_hevc_hardware_encode_decode?: boolean
    av1_encode_decode?: boolean
    vp9_bitstream_decoding?: boolean
    oneapi_support?: boolean
    openvino_support?: boolean
    directx_support?: string
    vulkan_support?: number
    opengl_support?: string
    opencl_support?: number
    multi_format_codec_engines?: number
    intel_extension_for_pytorch_ipex_support?: boolean
    intel_xe_super_sampling_xess_support?: boolean
    slots?: number
    weight?: string
    minimum_power_supply_unit?: string
    power_connectors?: string
    
    execution_units?: number;
    memory_type?: string;
    tgp?: string;
    graphics_clock_lp?: string;
    tbp_lp?: string;
    intel_deep_link_hyper_compute?: boolean;
    intel_deep_link_hyper_encode?: boolean;
    intel_deep_link_stream_assist?: boolean;
}