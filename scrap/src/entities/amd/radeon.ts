import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { getColumnOptions } from "../entityFunctions"


@Entity()
export class AmdRadeon {
    @PrimaryGeneratedColumn()
    id?: number

    @Column(getColumnOptions())
    image?: string

    @Column(getColumnOptions())
    link?: string

    @Column(getColumnOptions())
    name?: string

    @Column(getColumnOptions())
    family?: string

    @Column(getColumnOptions())
    series?: string

    @Column(getColumnOptions())
    board_type?: string

    @Column(getColumnOptions("longtext"))
    os_support?: string

    @Column(getColumnOptions())
    additional_power_connector?: string

    @Column(getColumnOptions("float"))
    compute_units?: number

    @Column(getColumnOptions())
    boost_frequency?: string

    @Column(getColumnOptions())
    game_frequency?: string

    @Column(getColumnOptions())
    base_frequency?: string

    @Column(getColumnOptions("float"))
    ray_accelerators?: number

    @Column(getColumnOptions("float"))
    ai_accelerators?: number

    @Column(getColumnOptions())
    peak_pixel_fill_rate?: string

    @Column(getColumnOptions())
    peak_texture_fill_rate?: string

    @Column(getColumnOptions())
    peak_half_precision_compute_performance?: string

    @Column(getColumnOptions())
    peak_single_precision_compute_performance?: string

    @Column(getColumnOptions())
    peak_int4_performance?: string

    @Column(getColumnOptions())
    peak_int8_performance?: string

    @Column(getColumnOptions("float"))
    rops?: number

    @Column(getColumnOptions("float"))
    stream_processors?: number

    @Column(getColumnOptions("float"))
    texture_units?: number

    @Column(getColumnOptions())
    transistor_count?: string

    @Column(getColumnOptions())
    typical_board_power_desktop?: string

    @Column(getColumnOptions())
    minimum_psu_recommendation?: string

    @Column(getColumnOptions("longtext"))
    recommended_power_supply?: string

    @Column(getColumnOptions())
    amd_infinity_cache_technology?: string

    @Column(getColumnOptions())
    memory_speed?: string

    @Column(getColumnOptions())
    max_memory_size?: string

    @Column(getColumnOptions())
    memory_type?: string

    @Column(getColumnOptions())
    memory_interface?: string

    @Column(getColumnOptions())
    memory_bandwidth?: string

    @Column(getColumnOptions())
    effective_memory_bandwidth?: string

    @Column(getColumnOptions("boolean"))
    hdmi_4k_support?: boolean

    @Column(getColumnOptions("boolean"))
    "4k_h264_decode"?: boolean

    @Column(getColumnOptions("boolean"))
    "4k_h264_encode"?: boolean

    @Column(getColumnOptions("boolean"))
    h265_hevc_decode?: boolean

    @Column(getColumnOptions("boolean"))
    h265_hevc_encode?: boolean

    @Column(getColumnOptions("boolean"))
    av1_decode?: boolean

    @Column(getColumnOptions("boolean"))
    av1_encode?: boolean

    @Column(getColumnOptions())
    displayport?: string

    @Column(getColumnOptions())
    hdmi?: string

    @Column(getColumnOptions("boolean"))
    usb_type_c?: boolean

    @Column(getColumnOptions())
    length?: string

    @Column(getColumnOptions("float"))
    slots?: number

    @Column(getColumnOptions("longtext"))
    supported_technologies?: string

    @Column(getColumnOptions())
    launch_date?: string
}