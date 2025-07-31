import { Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../texts/appText";

interface ProductCardProps {
	title?: string
	mainDescription?: string
	secondaryDescription?: string
	extraInfo?: string
	onPress?: () => void
}


export default function ProductCard({ title, mainDescription, secondaryDescription, extraInfo, onPress } : ProductCardProps) {
	const theme = useTheme()

	return (
		<Pressable
			onPress={onPress}
			className="py-3"
			android_ripple={{
				color: theme.colors.secondaryContainer,
			}}
		>
			<View>
				<AppText bold className="text-xl mb-2">{title}</AppText>
			</View>

			<View className="flex-row justify-between">
				<View>
					<AppText bold color={theme.colors.onSurfaceDisabled}>{mainDescription}</AppText>
					<AppText color={theme.colors.onSurfaceDisabled}>{secondaryDescription}</AppText>
				</View>
				<View className="justify-end">
					<AppText>{extraInfo}</AppText>
				</View>
			</View>
		</Pressable>
	)
}