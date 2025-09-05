import { AntDesign } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

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
					<Image
						source={product.image}
						style={{ width: '30%', aspectRatio: 1, borderRadius: 10 }}
					/>
				}
				<View className="flex-1 gap-2">
					<View className="flex-1 flex-row items-start justify-between max-h-[60]">
						<View className="flex-1 h-full justify-center">
							<AppText bold className='text-4xl'>{product?.name}</AppText>
						</View>
						<View>
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
						</View>
					</View>
					<View>
						<AppText className="text-lg" color={theme.colors.onSurfaceDisabled}>{product.device} | {product.architecture}</AppText>
						<AppText bold className="text-xl" color={theme.colors.onSurfaceDisabled}>{product.series}</AppText>
					</View>
				</View>
			</View>

			<View className="my-3">
				<SubTitle bold>Description</SubTitle>
				<AppText className="text-xl" >{product.description}</AppText>
			</View>
		</>
	)
}