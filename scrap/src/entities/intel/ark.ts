import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { getColumnOptions } from "../entityFunctions";

@Unique(["name"])
@Entity()
export class Ark {
	@PrimaryGeneratedColumn()
	id?: number

	@Column(getColumnOptions())
	name?: string
    
	@Column(getColumnOptions())
	model_number?: string
    
	@Column(getColumnOptions())
	code_name?: string
    
	@Column(getColumnOptions())
	memory_type?: string;

	@Column(getColumnOptions())
	tgp?: string;

	@Column(getColumnOptions())
	microarchitecture?: string
    
	@Column(getColumnOptions())
	lithography_type?: string
    
	@Column(getColumnOptions())
	vertical_segment?: string
    
	@Column(getColumnOptions())
	marketing_status?: string
    
	@Column(getColumnOptions())
	launch_date?: string
    
	@Column(getColumnOptions("boolean"))
	embedded_options_available?: boolean
    
	@Column(getColumnOptions("int"))
	render_slices?: number
    
	@Column(getColumnOptions("int"))
	ray_tracing_units?: number
    
	@Column(getColumnOptions("int"))
	intel_xe_matrix_extensions_intel_xmx_engines?: number
    
	@Column(getColumnOptions("int"))
	xe_vector_engines?: number
    
	@Column(getColumnOptions())
	graphics_clock?: string
    
	@Column(getColumnOptions("int"))
	gpu_peak_tops_int8?: number
    
	@Column(getColumnOptions())
	tbp?: string
    
	@Column(getColumnOptions())
	pci_express_configurations?: string
    
	@Column(getColumnOptions())
	device_id?: string
    
	@Column(getColumnOptions())
	graphics_memory_interface?: string
    
	@Column(getColumnOptions())
	graphics_memory_bandwidth?: string
    
	@Column(getColumnOptions())
	graphics_memory_speed?: string
    
	@Column(getColumnOptions())
	graphics_output?: string
    
	@Column(getColumnOptions("boolean"))
	hdmi_variable_refresh_rate_vrr?: boolean
    
	@Column(getColumnOptions("boolean"))
	vesa_adaptive_sync?: boolean
    
	@Column(getColumnOptions())
	media_profiles?: string
    
	@Column(getColumnOptions())
	max_resolution_hdmi?: string
    
	@Column(getColumnOptions())
	max_resolution_dp?: string
    
	@Column(getColumnOptions("boolean"))
	h_265_hevc_hardware_encode_decode?: boolean
    
	@Column(getColumnOptions("boolean"))
	av1_encode_decode?: boolean
    
	@Column(getColumnOptions("boolean"))
	vp9_bitstream_decoding?: boolean
    
	@Column(getColumnOptions("boolean"))
	oneapi_support?: boolean
    
	@Column(getColumnOptions("boolean"))
	openvino_support?: boolean
    
	@Column(getColumnOptions())
	directx_support?: string
    
	@Column(getColumnOptions("float"))
	vulkan_support?: number
    
	@Column(getColumnOptions())
	opengl_support?: string
    
	@Column(getColumnOptions("int"))
	opencl_support?: number
    
	@Column(getColumnOptions("int"))
	multi_format_codec_engines?: number
    
	@Column(getColumnOptions("boolean"))
	intel_extension_for_pytorch_ipex_support?: boolean
    
	@Column(getColumnOptions("boolean"))
	intel_xe_super_sampling_xess_support?: boolean
    
	@Column(getColumnOptions("float"))
	slots?: number
    
	@Column(getColumnOptions())
	weight?: string
    
	@Column(getColumnOptions())
	minimum_power_supply_unit?: string
    
	@Column(getColumnOptions())
	power_connectors?: string


	@Column(getColumnOptions("int"))
	execution_units?: number;
    
    
	@Column(getColumnOptions())
    graphics_clock_lp?: string;

	@Column(getColumnOptions())
    tbp_lp?: string;
	
	@Column(getColumnOptions("boolean"))
    intel_deep_link_hyper_compute?: boolean;
	
	@Column(getColumnOptions("boolean"))
    intel_deep_link_hyper_encode?: boolean;
	
	@Column(getColumnOptions("boolean"))
    intel_deep_link_stream_assist?: boolean;
}