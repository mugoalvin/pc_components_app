import AppText from "@/app/components/texts/appText";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { Image } from 'expo-image';
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { IntelCore, IntelCoreUltra } from "../../../../packages/interfaces";


interface RyzenMainInfoProps {
	product: Partial<IntelCore | IntelCoreUltra>
}

export default function IntelMainInfo({ product }: RyzenMainInfoProps) {
	const theme = useTheme()

	return (
		<>
			<View className='flex-row gap-4 mb-5'>
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
						<AppText className="text-lg" color={theme.colors.onSurfaceDisabled}>{product.vertical_segment} | {product.lithography}</AppText>
						<AppText bold className="text-xl" color={theme.colors.onSurfaceDisabled}>{product.recommended_customer_price}</AppText>
					</View>
				</View>
			</View>
		</>
	)
}