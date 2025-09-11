import ButtonCustom from "@/app/components/buttons/buttonCust"
import RyzenDescription from "@/app/pages/processors/ryzen/ryzen_descriptions"
import RyzenMainInfo from "@/app/pages/processors/ryzen/ryzen_main_info"
import { router } from "expo-router"
import { useEffect } from "react"
import { View } from "react-native"
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { Radeon } from "../../../../../packages/interfaces"
import Compatibility from "../../compatibility"
import RadeonSpecifications from "../../processors/ryzen/radeon_specs"

interface RadeonInfoPageProps {
	product: Radeon
}

export default function RadeonInfoPage({ product }: RadeonInfoPageProps) {
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

	const radeonCompatibles = [
		'additional_power_connector' in product && `Power Connectors: ${product.additional_power_connector}`,
		'displayport' in product && `Display Port: ${product.displayport}`,
		'hdmi' in product && product?.hdmi!,
	].filter((item): item is string => typeof item === "string")


	return (
		<>
			<View className='flex-1'>
				<RyzenMainInfo image={product?.image} name={product?.name!} mainInfo={product?.series} info1={product?.board_type} info2={product?.memory_speed?.replace("Up to ", '')} />
				<RyzenDescription description={product?.description!} />
				<RadeonSpecifications radeon={product!} />
				<Compatibility compatibles={radeonCompatibles} animationDelay={3200} />
			</View>

			<Animated.View className="w-full items-center" entering={FadeInDown.delay(4000)}>
				<Animated.View style={[animatedStyle, { alignItems: "center", width: 10 }]}>
					<ButtonCustom
						btnText='View In The Web'
						className='mb-5 h-14 w-full'
						onPress={() =>
							router.push({
								pathname: './webView',
								params: {
									uri: product?.link
								}
							})
						}
					/>
				</Animated.View>
			</Animated.View>
		</>
	)
}