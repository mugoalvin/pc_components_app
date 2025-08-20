import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getColumnOptions } from "../entityFunctions";

@Entity({ name: "xeon" })
export class XeonEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column(getColumnOptions())
	name?: string

	@Column(getColumnOptions())
	vertical_segment?: string

	@Column(getColumnOptions())
	processor_number?: string

	@Column(getColumnOptions())
	lithography?: string

	@Column(getColumnOptions())
	seriesName?: string

	@Column(getColumnOptions())
	recommended_customer_price?: string

	@Column(getColumnOptions("int"))
	total_cores?: number

	@Column(getColumnOptions("int"))
	total_threads?: number

	@Column(getColumnOptions())
	max_turbo_frequency?: string

	@Column(getColumnOptions())
	processor_base_frequency?: string

	@Column(getColumnOptions())
	cache?: string

	@Column(getColumnOptions())
	max_number_of_upi_links?: string

	@Column(getColumnOptions())
	tdp?: string

	@Column(getColumnOptions())
	launch_date?: string

	@Column(getColumnOptions())
	use_conditions?: string

	@Column(getColumnOptions('boolean'))
	embedded_options_available?: boolean

	@Column(getColumnOptions())
	max_memory_size_dependent_on_memory_type?: string

	@Column(getColumnOptions('int'))
	max_number_of_memory_channels?: number

	@CreateDateColumn(getColumnOptions("timestamp"))
	created_at?: Date

	@UpdateDateColumn(getColumnOptions("timestamp"))
	updated_at?: Date
}


// product_collection
// code_name

// intel_upi_speed
// marketing_status

// servicing_status
// memory_types
// maximum_high_bandwidth_memory_hbm
// ecc_memory_supported
// scalability
// pci_express_revision
// max_number_of_pci_express_lanes
// sockets_supported
// package_carrier
// dts_max
// tcase
// package_size
// intel_data_streaming_accelerator_dsa
// intel_advanced_matrix_extensions_amx
// intel_speed_select_technology_core_power
// intel_deep_learning_boost_intel_dl_boost_on_cpu
// intel_resource_director_technology_intel_rdt
// intel_speed_shift_technology
// intel_turbo_boost_technology
// intel_hyper_threading_technology
// intel_transactional_synchronization_extensions
// intel_64
// instruction_set_extensions
// number_of_avx_512_fma_units
// intel_crypto_acceleration
// intel_platform_firmware_resilience_support
// intel_control_flow_enforcement_technology
// intel_total_memory_encryption
// intel_aes_new_instructions
// intel_software_guard_extensions_intel_sgx
// default_maximum_enclave_page_cache_epc_size_for_intel_sgx
// intel_os_guard
// intel_trusted_execution_technology
// execute_disable_bit
// intel_boot_guard
// intel_run_sure_technology
// mode_based_execute_control_mbec
// intel_virtualization_technology_vt_x
// intel_virtualization_technology_for_directed_i_o_vt_d
// intel_vt_x_with_extended_page_tables_ept