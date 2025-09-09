import AppText from "@/app/components/texts/appText";
import { formatQuarterLabel } from "@/utils/functions";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Image } from 'expo-image';
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Animated, { BounceIn, FadeInLeft, ZoomIn } from "react-native-reanimated";
import { IntelCore, IntelCoreUltra } from "../../../../packages/interfaces";


interface RyzenMainInfoProps {
	product: Partial<IntelCore | IntelCoreUltra>
}

export default function IntelMainInfo({ product }: RyzenMainInfoProps) {
	const theme = useTheme()

	const image = (product.image)?.split('')[0] === "/"
		? 'https://www.intel.com' + product.image
		: product.image

	return (
		<>
			<View className='flex-row gap-4 mb-5'>
				{
					product.image !== null &&
					<Animated.View className="w-[30%] aspect-square" entering={ZoomIn.delay(500)}>
						<Image
							source={image}
							style={{ aspectRatio: 1, borderRadius: 10 }}
						/>
					</Animated.View>
				}

				<Animated.View className={`flex-1 gap-2 ${product.image === null && 'h-24'}`}>
					<Animated.View className="flex-1 flex-row items-start justify-between max-h-[60]">
						<View className="flex-1 h-full justify-center">
							<AppText bold className='text-4xl' enteringAnimation={FadeInLeft.springify().mass(5).delay(700)}>{product?.name}</AppText>
						</View>
						<Animated.View entering={BounceIn.delay(900)}>
							<IconButton
								style={{
									width: 40,
									height: 40
								}}
								icon={() =>
									<AntDesign name='hearto' color={theme.colors.primary} size={16} />
								}
								onPress={() => { }}
							/>
						</Animated.View>
					</Animated.View>
					<Animated.View entering={FadeInLeft.duration(500).delay(700)}>
						<AppText className="text-lg" color={theme.colors.onSurfaceDisabled}>{product.vertical_segment} | {product.lithography}</AppText>
						{/* <AppText bold className="text-xl" color={theme.colors.onSurfaceDisabled}>{product.recommended_customer_price}</AppText> */}
						<AppText className="text-xl" color={theme.colors.onSurfaceDisabled}>{formatQuarterLabel(product.launch_date || '')}</AppText>
					</Animated.View>
				</Animated.View>
			</View>
		</>
	)
}