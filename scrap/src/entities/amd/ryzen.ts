import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import { getColumnOptions } from "../entityFunctions"


@Unique(["name"])
@Entity()
export class AmdRyzen {
	@PrimaryGeneratedColumn()
	id?: number

	@Column(getColumnOptions())
	name?: string
	
	@Column(getColumnOptions())
	family?: string
	
	@Column(getColumnOptions())
	series?: string
	
	@Column(getColumnOptions())
	image?: string
	
	@Column(getColumnOptions())
	link?: string
	
	@Column(getColumnOptions())
	form_factor?: string
	
	@Column(getColumnOptions())
	market_segment?: string
	
	@Column(getColumnOptions("boolean"))
	amd_pro_technologies?: boolean
	
	@Column(getColumnOptions())
	regional_availability?: string
	
	@Column(getColumnOptions())
	former_codename?: string
	
	@Column(getColumnOptions())
	architecture?: string
	
	@Column(getColumnOptions("int"))
	number_of_cpu_cores?: number
	
	@Column(getColumnOptions("boolean"))
	multithreading_smt?: boolean
	
	@Column(getColumnOptions("int"))
	number_of_threads?: number
	
	@Column(getColumnOptions())
	max_boost_clock?: string
	
	@Column(getColumnOptions())
	base_clock?: string
	
	@Column(getColumnOptions())
	l1_cache?: string
	
	@Column(getColumnOptions())
	l2_cache?: string
	
	@Column(getColumnOptions())
	l3_cache?: string
	
	@Column(getColumnOptions())
	default_tdp?: string
	
	@Column(getColumnOptions())
	processor_technology_for_cpu_cores?: string
	
	@Column(getColumnOptions())
	processor_technology_for_i_o_die?: string
	
	@Column(getColumnOptions("int"))
	package_die_count?: number
	
	@Column(getColumnOptions("boolean"))
	unlocked_for_overclocking?: boolean
	
	@Column(getColumnOptions("boolean"))
	amd_expo_memory_overclocking_technology?: boolean
	
	@Column(getColumnOptions("boolean"))
	precision_boost_overdrive?: boolean
	
	@Column(getColumnOptions("boolean"))
	curve_optimizer_voltage_offsets?: boolean
	
	@Column(getColumnOptions("boolean"))
	amd_ryzen_master_support?: boolean
	
	@Column(getColumnOptions())
	cpu_socket?: string
	
	@Column(getColumnOptions())
	supporting_chipsets?: string
	
	@Column(getColumnOptions())
	cpu_boost_technology?: string
	
	@Column(getColumnOptions())
	instruction_set?: string
	
	@Column(getColumnOptions())
	supported_extensions?: string
	
	@Column(getColumnOptions())
	thermal_solution_pib?: string
	
	@Column(getColumnOptions())
	thermal_solution_mpk?: string

	@Column(getColumnOptions())
	recommended_cooler?: string
	
	@Column(getColumnOptions())
	max_operating_temperature_tjmax?: string
	
	@Column(getColumnOptions())
	launch_date?: string
	
	@Column(getColumnOptions())
	os_support?: string
}