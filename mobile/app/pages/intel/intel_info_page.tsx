import IntelSpecifications from "@/app/components/ui/productDetails/intel_specs";
import { View } from "react-native";
import { IntelCore, IntelCoreUltra, IntelXeon } from "../../../../packages/interfaces";
import Compatibility from "../compatibility";
import IntelMainInfo from "./intel_main_info";

interface IntelInfoPageProps {
	product: IntelCore | IntelCoreUltra | IntelXeon
}

export default function IntelInfoPage({ product }: IntelInfoPageProps) {
	const isUltra = (product.name as string).toLowerCase().includes('ultra')
	const isXeon = (product.name as string).toLowerCase().includes('xeon')


	const coreCompatibilities = [
		'memory_types' in product && product.memory_types && `Memory Sticks: ${product.memory_types}`,
		'graphics_output' in product && product.graphics_output && `Graphics Output: ${product.graphics_output}`,
		'max_resolution_dp' in product && product.max_resolution_dp && `Max Resolution (DP): ${product.max_resolution_dp}`,
		'max_resolution_hdmi' in product && product.max_resolution_hdmi && `Max Resolution (HDMI): ${product.max_resolution_hdmi}`,
		'number_of_displays_supported' in product && product.number_of_displays_supported && `Number Of Displays Supported: ${product.number_of_displays_supported}`,
	].filter((item): item is string => typeof item === "string")

	const xeonCompatibilities = [
		'max_number_of_upi_links' in product && `Max UPI Links: ${product.max_number_of_upi_links}`,
		'tdp' in product && `Power Usage: ${product.tdp}`,
		'max_number_of_memory_channels' in product && `Max Memory Channels: ${product.max_number_of_memory_channels}`,
		'max_memory_size_dependent_on_memory_type' in product && `Max Memory Size: ${product.max_memory_size_dependent_on_memory_type}`,
	].filter((item): item is string => typeof item === "string")

	return (
		<>
			<View className="flex-1">
				<IntelMainInfo product={product} />
				<IntelSpecifications coreData={product} animationDelay={1000} />
				<Compatibility compatibles={isXeon ? xeonCompatibilities : coreCompatibilities} animationDelay={2000} />
			</View>
		</>
	)
}