import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { getColumnOptions } from "../entityFunctions";

@Unique(["name"])
@Entity({ name: "geforce" })
export class GeForceEntity {
	@PrimaryGeneratedColumn()
	id?: number

	@Column(getColumnOptions())
	name?: string

	@Column(getColumnOptions())
	standard_memory_config?: string

	@Column(getColumnOptions())
	memory_interface_width?: string

	@Column(getColumnOptions())
	nvidia_dlss?: string

	@Column(getColumnOptions("int"))
	nvidia_cuda_cores?: number

	@Column(getColumnOptions())
	shader_cores?: string

	@Column(getColumnOptions('boolean'))
	ray_tracing?: boolean

	@Column(getColumnOptions())
	nvidia_architecture?: string

	@Column(getColumnOptions())
	length?: string

	@Column(getColumnOptions())
	width?: string

	@Column(getColumnOptions())
	slot?: string

	@Column(getColumnOptions('int'))
	maximum_gpu_temperature_in_c?: number

	@Column(getColumnOptions())
	total_graphics_power_w?: string

	@Column(getColumnOptions('int'))
	required_system_power_w_5?: number

	// @Column(getColumnOptions())
	// required_power_connectors?: string

	// @Column(getColumnOptions())
	// tensor_cores_ai?: string

	// @Column(getColumnOptions())
	// ray_tracing_cores?: string

	// @Column(getColumnOptions('int'))
	// boost_clock_ghz?: number

	// @Column(getColumnOptions('int'))
	// base_clock_ghz?: number

	// @Column(getColumnOptions())
	// maximum_digital_resolution_1?: string

	// @Column(getColumnOptions())
	// standard_display_connectors?: string

	// @Column(getColumnOptions())
	// multi_monitor?: string

	// @Column(getColumnOptions('int'))
	// hdcp?: number

	// @Column(getColumnOptions())
	// nvidia_reflex?: string

	// @Column(getColumnOptions('boolean'))
	// nvidia_broadcast?: boolean

	// @Column(getColumnOptions('boolean'))
	// pci_express_gen_5?: boolean

	// @Column(getColumnOptions('boolean'))
	// resizable_bar?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_app?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_freestyle?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_shadowplay?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_highlights?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_g_sync?: boolean

	// @Column(getColumnOptions('boolean'))
	// game_ready_drivers?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_studio_drivers?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_omniverse?: boolean

	// @Column(getColumnOptions('boolean'))
	// rtx_remix?: boolean

	// @Column(getColumnOptions('boolean'))
	// microsoft_directx_12_ultimate?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_gpu_boost?: boolean

	// @Column(getColumnOptions('boolean'))
	// nvidia_nvlink_sli_ready?: boolean

	// @Column(getColumnOptions('boolean'))
	// vulkan_1_4_opengl_4_6?: boolean

	// @Column(getColumnOptions())
	// nvidia_encoder_nvenc?: string

	// @Column(getColumnOptions())
	// nvidia_decoder_nvdec?: string

	// @Column(getColumnOptions('boolean'))
	// av1_encode?: boolean

	// @Column(getColumnOptions('boolean'))
	// av1_decode?: boolean

	// @Column(getColumnOptions('int'))
	// cuda_capability?: number

	// @Column(getColumnOptions('boolean'))
	// vr_ready?: boolean

	// @Column(getColumnOptions())
	// sff_ready_enthusiast_geforce_card?: string
}