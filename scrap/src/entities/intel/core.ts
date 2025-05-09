import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { getColumnOptions } from "../functions";

@Entity()
export class IntelCoreIx {
    @PrimaryGeneratedColumn()
    id?: number;

	@Column(getColumnOptions())
	name?: string

	@Column(getColumnOptions())
	code_name?: string

	@Column(getColumnOptions())
	vertical_segment?: string

	@Column(getColumnOptions())
	processor_number?: string

	@Column(getColumnOptions())
	lithography?: string

	@Column(getColumnOptions())
	recommended_customer_price?: string

	@Column(getColumnOptions())
	number_of_performance_cores?: number

	@Column(getColumnOptions())
	number_of_efficient_cores?: number

	@Column(getColumnOptions())
	total_threads?: number

	@Column(getColumnOptions())
	max_turbo_frequency?: string

	@Column(getColumnOptions())
	intel_thermal_velocity_boost_frequency?: string

	@Column(getColumnOptions())
	intel_turbo_boost_max_technology_3_0_frequency?: string

	@Column(getColumnOptions())
	performance_core_max_turbo_frequency?: string

	@Column(getColumnOptions())
	performance_core_base_frequency?: string

	@Column(getColumnOptions())
	cache?: string

	@Column(getColumnOptions())
	total_l2_cache?: string

	@Column(getColumnOptions())
	processor_base_power?: string

	@Column(getColumnOptions())
	tdp?: string

	@Column(getColumnOptions())
	launch_date?: string

	@Column(getColumnOptions())
	embedded_options_available?: boolean

	@Column(getColumnOptions())
	use_conditions?: string

	@Column(getColumnOptions())
	datasheet?: string

	@Column(getColumnOptions())
	memory_types?: string

	@Column(getColumnOptions())
	max_number_of_memory_channels?: number

	@Column(getColumnOptions())
	max_memory_bandwidth?: string

	@Column(getColumnOptions())
	ecc_memory_supported?: boolean

	@Column(getColumnOptions())
	graphics_base_frequency?: string

	@Column(getColumnOptions())
	graphics_max_dynamic_frequency?: string

	@Column(getColumnOptions())
	graphics_output?: string

	@Column(getColumnOptions("int"))
	execution_units?: number

	@Column(getColumnOptions())
	max_resolution_hdmi?: string

	@Column(getColumnOptions())
	max_resolution_dp?: string

	@Column(getColumnOptions())
	max_resolution_edp_integrated_flat_panel?: string

	@Column(getColumnOptions("float"))
	directx_support?: number

	@Column(getColumnOptions("float"))
	opengl_support?: number

	@Column(getColumnOptions("float"))
	opencl_support?: number

	@Column(getColumnOptions("float"))
	multi_format_codec_engines?: number

	@Column(getColumnOptions())
	intel_quick_sync_video?: boolean

	@Column(getColumnOptions())
	intel_clear_video_hd_technology?: boolean

	@Column(getColumnOptions("int"))
	number_of_displays_supported?: number

	@Column(getColumnOptions())
	device_id?: string

	@Column(getColumnOptions())
	max_number_of_dmi_lanes?: boolean

	@Column(getColumnOptions())
	scalability?: string

	@Column(getColumnOptions())
	pci_express_revision?: string

	@Column(getColumnOptions())
	pci_express_configurations?: string

	@Column(getColumnOptions("int"))
	max_number_of_pci_express_lanes?: number

	@Column(getColumnOptions("int"))
	max_cpu_configuration?: number

	@Column(getColumnOptions())
	thermal_solution_specification?: string

	@Column(getColumnOptions())
	tjunction?: string

	@Column(getColumnOptions())
	package_size?: string

	@Column(getColumnOptions())
	max_operating_temperature?: string

	@Column(getColumnOptions())
	intel_volume_management_device_vmd?: boolean

	@Column(getColumnOptions("int"))
	intel_gaussian_neural_accelerator?: number

	@Column(getColumnOptions())
	intel_thread_director?: boolean

	@Column(getColumnOptions())
	intel_deep_learning_boost_intel_dl_boost_on_cpu?: boolean

	@Column(getColumnOptions())
	intel_speed_shift_technology?: boolean

	@Column(getColumnOptions())
	intel_adaptive_boost_technology?: boolean

	@Column(getColumnOptions())
	intel_thermal_velocity_boost?: boolean

	@Column(getColumnOptions())
	intel_turbo_boost_max_technology_3_0?: boolean

	@Column(getColumnOptions("int"))
	intel_turbo_boost_technology?: number

	@Column(getColumnOptions())
	intel_hyper_threading_technology?: boolean

	@Column(getColumnOptions())
	intel_64?: boolean

	@Column(getColumnOptions())
	instruction_set?: string

	@Column(getColumnOptions())
	instruction_set_extensions?: string

	@Column(getColumnOptions())
	idle_states?: boolean

	@Column(getColumnOptions())
	enhanced_intel_speedstep_technology?: boolean

	@Column(getColumnOptions())
	thermal_monitoring_technologies?: boolean

	@Column(getColumnOptions())
	intel_hardware_shield_eligibility?: boolean

	@Column(getColumnOptions())
	intel_threat_detection_technology_tdt?: boolean

	@Column(getColumnOptions())
	intel_active_management_technology_amt?: boolean

	@Column(getColumnOptions())
	intel_standard_manageability_ism?: boolean

	@Column(getColumnOptions())
	intel_remote_platform_erase_rpe?: boolean

	@Column(getColumnOptions())
	intel_one_click_recovery?: boolean

	@Column(getColumnOptions())
	intel_control_flow_enforcement_technology?: boolean

	@Column(getColumnOptions())
	intel_total_memory_encryption_multi_key?: boolean

	@Column(getColumnOptions())
	intel_aes_new_instructions?: boolean

	@Column(getColumnOptions())
	secure_key?: boolean

	@Column(getColumnOptions())
	intel_os_guard?: boolean

	@Column(getColumnOptions())
	intel_trusted_execution_technology?: boolean

	@Column(getColumnOptions())
	execute_disable_bit?: boolean

	@Column(getColumnOptions())
	intel_boot_guard?: boolean

	@Column(getColumnOptions())
	mode_based_execute_control_mbec?: boolean

	@Column(getColumnOptions())
	intel_stable_it_platform_program_sipp?: boolean

	@Column(getColumnOptions())
	intel_virtualization_technology_with_redirect_protection_vt_rp?: boolean

	@Column(getColumnOptions())
	intel_virtualization_technology_vt_x?: boolean

	@Column(getColumnOptions())
	intel_virtualization_technology_for_directed_i_o_vt_d?: boolean

	@Column(getColumnOptions())
	intel_vt_x_with_extended_page_tables_ept?: boolean

}