// ==============================================> AMD Products <==============================================

export interface InitialAmdProps {
    name: string
    link: string
}

// Radeon
export interface Radeon {
    image?: string
    link?: string
    name?: string
    family?: string
    series?: string
    description?: string
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

    created_at?: Date
    updated_at?: Date
}



// Ryzen
export interface Ryzen {
    name: string
    family?: string
    series?: string
    image?: string
    device?: string
    description?: string
    form_factor?: string
    market_segment?: string
    amd_pro_technologies?: boolean
    regional_availability?: string
    former_codename?: string
    architecture?: string
    link?: string
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

    created_at?: Date
    updated_at?: Date
}






// =============================================> Intel Products <=============================================
export interface IntelFamily {
    familyName: string
    familyLink: string
}

export interface InitialIntelProps {
    name: string
    link: string
}



export interface IntelCoreUltra {
    name?: string;
    code_name?: string;
    vertical_segment?: string;
    series?: string
    image?: string
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

    created_at?: Date
    updated_at?: Date
}

export interface IntelCore {
    name?: string
    code_name?: string
    vertical_segment?: string
    processor_number?: string
    lithography?: string
    image?: string
    recommended_customer_price?: string
    number_of_performance_cores?: number
    number_of_efficient_cores?: number
    total_cores?: number
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

    created_at?: Date
    updated_at?: Date
}



export interface IntelArk {
    name?: string
    model_number?: string
    code_name?: string
    image?: string
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

    created_at?: Date
    updated_at?: Date
}

export interface IntelXeon {
    name?: string
    vertical_segment?: string
    processor_number?: string
    seriesName?: string
    image?: string
    lithography?: string
    recommended_customer_price?: string
    total_cores?: number
    total_threads?: number
    max_turbo_frequency?: string
    processor_base_frequency?: string
    cache?: string
    max_number_of_upi_links?: string
    tdp?: string
    launch_date?: string
    use_conditions?: string
    embedded_options_available?: boolean
    max_memory_size_dependent_on_memory_type?: string
    max_number_of_memory_channels?: number

    created_at?: Date
    updated_at?: Date
}


// =============================================> Nvidia GeForce <=============================================
export interface NvidiaGeForce {
    name?: string
    nvidia_cuda_cores?: number
    shader_cores?: string
    tensor_cores_ai?: string
    ray_tracing_cores?: string
    boost_clock_ghz?: number
    base_clock_ghz?: number
    standard_memory_config?: string
    memory_interface_width?: string
    maximum_digital_resolution_1?: string
    standard_display_connectors?: string
    multi_monitor?: string
    hdcp?: number
    nvidia_architecture?: string
    ray_tracing?: boolean
    nvidia_dlss?: string
    nvidia_reflex?: string
    nvidia_broadcast?: boolean
    pci_express_gen_5?: boolean
    resizable_bar?: boolean
    nvidia_app?: boolean
    nvidia_freestyle?: boolean
    nvidia_shadowplay?: boolean
    nvidia_highlights?: boolean
    nvidia_g_sync?: boolean
    game_ready_drivers?: boolean
    nvidia_studio_drivers?: boolean
    nvidia_omniverse?: boolean
    rtx_remix?: boolean
    microsoft_directx_12_ultimate?: boolean
    nvidia_gpu_boost?: boolean
    nvidia_nvlink_sli_ready?: boolean
    vulkan_1_4_opengl_4_6?: boolean
    nvidia_encoder_nvenc?: string
    nvidia_decoder_nvdec?: string
    av1_encode?: boolean
    av1_decode?: boolean
    cuda_capability?: number
    vr_ready?: boolean
    length?: string
    width?: string
    slot?: string
    sff_ready_enthusiast_geforce_card?: string
    maximum_gpu_temperature_in_c?: number,
    total_graphics_power_w?: number,
    required_system_power_w_5?: number
    required_power_connectors?: string

    created_at?: Date
    updated_at?: Date
}