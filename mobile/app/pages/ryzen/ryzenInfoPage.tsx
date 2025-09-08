import ButtonCustom from "@/app/components/buttons/buttonCust";
import RyzenMainInfo from "@/app/components/ui/productDetails/ryzen_main_info";
import RyzenSpecifications from "@/app/components/ui/productDetails/ryzen_specs";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ryzen } from "../../../../packages/interfaces";
import Compatibility from "../compatibility";

interface RyzenInfoPageProps {
	product: Ryzen
}

export default function RyzenInfoPage({ product }: RyzenInfoPageProps) {
	const animatedWidth = useSharedValue(0)

	useEffect(() => {
		setTimeout(() => {
			animatedWidth.value = withSpring(400, {
				duration: 3000,
			})
		}, 4300)
	}, [])

	const animatedStyle = useAnimatedStyle(() => ({
		width: animatedWidth.value
	}))

	return (
		<>
			<View className='flex-1'>
				<RyzenMainInfo product={product} />
				<RyzenSpecifications ryzenData={product as Ryzen} />
				<Compatibility data={product} />
			</View>
			<Animated.View className="w-full items-center" entering={FadeInDown.delay(4000)}>
				<Animated.View style={[ animatedStyle, { alignItems: "center", width: 10 }]}>
					<ButtonCustom
						btnText='View In The Web'
						className='mb-5 h-14 w-full'
						onPress={() =>
							router.push({
								pathname: './webView',
								params: {
									uri: product.link
								}
							})
						}
					/>
				</Animated.View>
			</Animated.View>
		</>
	)
}