import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../../texts/appText";

export default function RecommendedForYou() {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<LinearGradient
			className="flex-row p-3 gap-7"
			style={{ borderRadius: 10 }}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			colors={
				colorScheme === 'light'
					? [
						theme.colors.elevation.level4,
						theme.colors.elevation.level5,
					]
					: [
						theme.colors.elevation.level1,
						theme.colors.elevation.level2,
					]}
		>
			<View>
				<AppText bold className="text-3xl">RTX 4090</AppText>
				<AppText>24 GB GDDR6X</AppText>
			</View>
			<View className="flex-1 h-36">
				<Image
				source="https://static.gigabyte.com/StaticFile/Image/Global/8672dbdf9d50a340b83d98d5399729ca/Product/32032/webp/1000"
				style={{ flex: 1, resizeMode: "cover", borderRadius: 10 }}
				/>
			</View>
		</LinearGradient>
	)
}