import { AntDesign } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Animated, { BounceIn, FadeInDown, FadeInLeft, FadeInRight, ZoomIn } from "react-native-reanimated";

import { Ryzen } from "../../../../../packages/interfaces";
import AppText from "../../texts/appText";
import SubTitle from "../../texts/subTitle";

interface RyzenMainInfoProps {
	product: Partial<Ryzen>
}

export default function RyzenMainInfo({ product }: RyzenMainInfoProps) {
	const theme = useTheme()

	return (
		<>
			<View className='flex-row gap-4'>
				{
					product.image &&
					<Animated.View className="w-[30%] aspect-square" entering={ZoomIn.delay(500)}>
						<Image
							source={product.image}
							style={{ aspectRatio: 1, borderRadius: 10 }}
						/>
					</Animated.View>
				}
				<View className="flex-1 gap-2">
					<View className="flex-1 flex-row items-start justify-between max-h-[60]">
						<View className="flex-1 h-full justify-center">
							<AppText enteringAnimation={FadeInLeft.springify().mass(5).delay(700)} bold className='text-4xl'>{product?.name}</AppText>
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
					</View>
					<Animated.View entering={FadeInLeft.duration(500).delay(700)}>
						<AppText className="text-lg" color={theme.colors.onSurfaceDisabled}>{product.device} | {product.architecture}</AppText>
						<AppText bold className="text-xl" color={theme.colors.onSurfaceDisabled}>{product.series}</AppText>
					</Animated.View>
				</View>
			</View>

			<View className="my-10 gap-2">
				<SubTitle enteringAnimation={FadeInRight.springify().delay(1000)} bold>Description</SubTitle>
				<AppText className="text-xl" enteringAnimation={FadeInDown.delay(1400)}>{product.description}</AppText>
			</View>
		</>
	)
}