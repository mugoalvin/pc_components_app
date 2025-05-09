import { Entity, PrimaryGeneratedColumn, Column, ColumnOptions } from "typeorm"

const defaultColumnProperties: ColumnOptions = {
	nullable: true
}

@Entity()
export class AmdRyzen {
	@PrimaryGeneratedColumn()
	id?: number

	@Column(defaultColumnProperties)
	name?: string
	
	@Column(defaultColumnProperties)
	family?: string
	
	@Column(defaultColumnProperties)
	series?: string
	
	@Column(defaultColumnProperties)
	image?: string
	
	@Column(defaultColumnProperties)
	link?: string
	
	@Column(defaultColumnProperties)
	form_factor?: string
	
	@Column(defaultColumnProperties)
	market_segment?: string
	
	@Column(defaultColumnProperties)
	amd_pro_technologies?: boolean
	
	@Column(defaultColumnProperties)
	regional_availability?: string
	
	@Column(defaultColumnProperties)
	former_codename?: string
	
	@Column(defaultColumnProperties)
	architecture?: string
	
	@Column(defaultColumnProperties)
	number_of_cpu_cores?: number
	
	@Column(defaultColumnProperties)
	multithreading_smt?: boolean
	
	@Column(defaultColumnProperties)
	number_of_threads?: number
	
	@Column(defaultColumnProperties)
	max_boost_clock?: string
	
	@Column(defaultColumnProperties)
	base_clock?: string
	
	@Column(defaultColumnProperties)
	l1_cache?: string
	
	@Column(defaultColumnProperties)
	l2_cache?: string
	
	@Column(defaultColumnProperties)
	l3_cache?: string
	
	@Column(defaultColumnProperties)
	default_tdp?: string
	
	@Column(defaultColumnProperties)
	processor_technology_for_cpu_cores?: string
	
	@Column(defaultColumnProperties)
	processor_technology_for_i_o_die?: string
	
	@Column(defaultColumnProperties)
	package_die_count?: number
	
	@Column(defaultColumnProperties)
	unlocked_for_overclocking?: boolean
	
	@Column(defaultColumnProperties)
	amd_expo_memory_overclocking_technology?: boolean
	
	@Column(defaultColumnProperties)
	precision_boost_overdrive?: boolean
	
	@Column(defaultColumnProperties)
	curve_optimizer_voltage_offsets?: boolean
	
	@Column(defaultColumnProperties)
	amd_ryzen_master_support?: boolean
	
	@Column(defaultColumnProperties)
	cpu_socket?: string
	
	@Column(defaultColumnProperties)
	supporting_chipsets?: string
	
	@Column(defaultColumnProperties)
	cpu_boost_technology?: string
	
	@Column(defaultColumnProperties)
	instruction_set?: string
	
	@Column(defaultColumnProperties)
	supported_extensions?: string
	
	@Column(defaultColumnProperties)
	thermal_solution_pib?: string
	
	@Column(defaultColumnProperties)
	thermal_solution_mpk?: string

	@Column(defaultColumnProperties)
	recommended_cooler?: string
	
	@Column(defaultColumnProperties)
	max_operating_temperature_tjmax?: string
	
	@Column(defaultColumnProperties)
	launch_date?: string
	
	@Column(defaultColumnProperties)
	os_support?: string
}