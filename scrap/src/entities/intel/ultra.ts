import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"
import { getColumnOptions } from "../entityFunctions";
import { IntelUltraSeries, IntelUltraSeriesValues } from "../../scrapers/intel/types";

@Unique(["name"])
@Entity({ name: "ultra" })
export class UltraEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column(getColumnOptions())
	name?: string;

	@Column(getColumnOptions())
	code_name?: string;

	@Column(getColumnOptions("enum", {
		enum: IntelUltraSeriesValues,
		enumName: "intel_ultra_series"
	}))
	series?: IntelUltraSeries;

	@Column(getColumnOptions())
	vertical_segment?: string;

	@Column(getColumnOptions())
	processor_number?: string;

	@Column(getColumnOptions("float"))
	overall_peak_tops_int8?: number;

	@Column(getColumnOptions())
	recommended_customer_price?: string;

	@Column(getColumnOptions("int"))
	number_of_performance_cores?: number;

	@Column(getColumnOptions("int"))
	number_of_efficient_cores?: number;

	@Column(getColumnOptions("int"))
	number_of_low_power_efficient_cores?: number;

	@Column(getColumnOptions("int"))
	total_threads?: number;

	@Column(getColumnOptions())
	max_turbo_frequency?: string;

	@Column(getColumnOptions())
	performance_core_max_turbo_frequency?: string;

	@Column(getColumnOptions())
	efficient_core_max_turbo_frequency?: string;

	@Column(getColumnOptions())
	low_power_efficient_core_max_turbo_frequency?: string;

	@Column(getColumnOptions())
	performance_core_base_frequency?: string;

	@Column(getColumnOptions())
	efficient_core_base_frequency?: string;

	@Column(getColumnOptions())
	low_power_efficient_core_base_frequency?: string;

	@Column(getColumnOptions())
	cache?: string;

	@Column(getColumnOptions())
	total_l2_cache?: string;

	@Column(getColumnOptions())
	processor_base_power?: string;

	@Column(getColumnOptions())
	maximum_turbo_power?: string;

	@Column(getColumnOptions())
	minimum_assured_power?: string;

	@Column(getColumnOptions("boolean"))
	intel_deep_learning_boost_intel_dl_boost_on_cpu?: boolean;

	@Column(getColumnOptions())
	ai_software_frameworks_supported_by_cpu?: string;

	@Column(getColumnOptions())
	cpu_lithography?: string;

	@Column(getColumnOptions())
	lithography?: string;

	@Column(getColumnOptions())
	launch_date?: string;

	@Column(getColumnOptions("boolean"))
	embedded_options_available?: boolean;

	@Column(getColumnOptions("boolean"))
	product_tuning_embedded_uses?: boolean;

	@Column(getColumnOptions())
	datasheet?: string;

	@Column(getColumnOptions())
	memory?: string;

	@Column(getColumnOptions())
	maximum_memory_speed?: string;

	@Column(getColumnOptions("int"))
	max_number_of_memory_channels?: number;

	@Column(getColumnOptions("boolean"))
	ecc_memory_supported?: boolean;

	@Column(getColumnOptions())
	graphics_base_frequency?: string;

	@Column(getColumnOptions())
	graphics_max_dynamic_frequency?: string;

	@Column(getColumnOptions("float"))
	gpu_peak_tops_int8?: number;

	@Column(getColumnOptions())
	graphics_output?: string;

	@Column(getColumnOptions("int"))
	xe_cores?: number;

	@Column(getColumnOptions("boolean"))
	ray_tracing?: boolean;

	@Column(getColumnOptions())
	max_resolution_hdmi?: string;

	@Column(getColumnOptions())
	max_resolution_dp?: string;

	@Column(getColumnOptions())
	max_resolution_edp_integrated_flat_panel?: string;

	@Column(getColumnOptions("float"))
	directx_support?: number;

	@Column(getColumnOptions("float"))
	opengl_support?: number;

	@Column(getColumnOptions("int"))
	opencl_support?: number;

	@Column(getColumnOptions("int"))
	multi_format_codec_engines?: number;

	@Column(getColumnOptions("boolean"))
	h_264_hardware_encode_decode?: boolean;

	@Column(getColumnOptions("boolean"))
	h_265_hevc_hardware_encode_decode?: boolean;

	@Column(getColumnOptions())
	h_266_vvc_hardware_encode_decode?: string;

	@Column(getColumnOptions("boolean"))
	av1_encode_decode?: boolean;

	@Column(getColumnOptions("boolean"))
	vp9_bitstream_decoding?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_quick_sync_video?: boolean;

	@Column(getColumnOptions("int"))
	number_of_displays_supported?: number;

	@Column(getColumnOptions())
	device_id?: string;

	@Column(getColumnOptions("boolean"))
	intel_deep_learning_boost_intel_dl_boost_on_gpu?: boolean;

	@Column(getColumnOptions())
	ai_software_frameworks_supported_by_gpu?: string;

	@Column(getColumnOptions("float"))
	npu_peak_tops_int8?: number;

	@Column(getColumnOptions("boolean"))
	sparsity_support?: boolean;

	@Column(getColumnOptions("boolean"))
	windows_studio_effects_support?: boolean;

	@Column(getColumnOptions())
	ai_software_frameworks_supported_by_npu?: string;

	@Column(getColumnOptions())
	pci_support?: string

	@Column(getColumnOptions())
	pci_express_configurations?: string;

	@Column(getColumnOptions("int"))
	max_number_of_pci_express_lanes?: number;

	@Column(getColumnOptions("int"))
	max_cpu_configuration?: number;

	@Column(getColumnOptions())
	max_operating_temperature?: string;

	@Column(getColumnOptions())
	package_size?: string;

	@Column(getColumnOptions("float"))
	intel_gaussian_neural_accelerator?: number;

	@Column(getColumnOptions("boolean"))
	intel_thread_director?: boolean;

	@Column(getColumnOptions("int"))
	intel_image_processing_unit?: number;

	@Column(getColumnOptions("boolean"))
	intel_smart_sound_technology?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_wake_on_voice?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_high_definition_audio?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_adaptix_technology?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_speed_shift_technology?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_turbo_boost_max_technology_3_0?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_hyper_threading_technology?: boolean;

	@Column(getColumnOptions())
	instruction_set?: string;

	@Column(getColumnOptions())
	instruction_set_extensions?: string;

	@Column(getColumnOptions("boolean"))
	thermal_monitoring_technologies?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_vpro_security_eligibility?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_hardware_shield_eligibility?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_partner_security_engine?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_threat_detection_technology_tdt?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_active_management_technology_amt?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_standard_manageability_ism?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_remote_platform_erase_rpe?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_one_click_recovery?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_control_flow_enforcement_technology?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_total_memory_encryption_multi_key?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_aes_new_instructions?: boolean;

	@Column(getColumnOptions("boolean"))
	secure_key?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_trusted_execution_technology?: boolean;

	@Column(getColumnOptions("boolean"))
	execute_disable_bit?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_os_guard?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_boot_guard?: boolean;

	@Column(getColumnOptions("boolean"))
	mode_based_execute_control_mbec?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_stable_it_platform_program_sipp?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_virtualization_technology_with_redirect_protection_vt_rp?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_virtualization_technology_vt_x?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_virtualization_technology_for_directed_i_o_vt_d?: boolean;

	@Column(getColumnOptions("boolean"))
	intel_vt_x_with_extended_page_tables_ept?: boolean;
}