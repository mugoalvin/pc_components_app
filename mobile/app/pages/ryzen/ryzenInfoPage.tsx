import ButtonCustom from "@/app/components/buttons/buttonCust";
import RyzenMainInfo from "@/app/components/ui/productDetails/ryzen_main_info";
import RyzenSpecifications from "@/app/components/ui/productDetails/ryzen_specs";
import { router } from "expo-router";
import { View } from "react-native";
import { Ryzen } from "../../../../packages/interfaces";
import Compatibility from "../compatibility";

interface RyzenInfoPageProps {
	product: Ryzen
}

export default function RyzenInfoPage({ product }: RyzenInfoPageProps) {
	return (
		<>
			<View className='flex-1'>
				<RyzenMainInfo product={product} />
				<RyzenSpecifications ryzenData={product as Ryzen} />
				<Compatibility data={product} />
			</View>
			<ButtonCustom
				btnText='View In The Web'
				className='mb-5 h-14'
				onPress={() =>
					router.push({
						pathname: './webView',
						params: {
							uri: product.link
						}
					})
				}
			/>
		</>
	)
}