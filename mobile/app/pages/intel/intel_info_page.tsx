import IntelSpecifications from "@/app/components/ui/productDetails/intel_specs";
import { View } from "react-native";
import { IntelCore, IntelCoreUltra } from "../../../../packages/interfaces";
import IntelMainInfo from "./intel_main_info";

interface IntelInfoPageProps {
	product: IntelCore | IntelCoreUltra
}

export default function IntelInfoPage({ product }: IntelInfoPageProps) {
	return (
		<>
			<View className="flex-1">
				<IntelMainInfo product={product} />
				<IntelSpecifications coreData={product} />
			</View>
		</>
	)
}