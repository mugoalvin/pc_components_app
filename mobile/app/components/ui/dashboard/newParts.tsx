import { Image } from "expo-image"
import { useColorScheme, View } from "react-native"

import { useTheme } from "react-native-paper"
import AppText from "../../texts/appText"

interface NewPartsProps {
	image?: string
	title?: string
	description?: string
	index?: number
}

export default function NewParts({ image, title, description, index }: NewPartsProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	
	return (
		<View
			// className={`w-36 rounded-xl p-3 ${index !== 0 && 'ml-2'}`}
			className={`h-48 w-36 rounded-xl p-3 ${index !== 0 && 'ml-2'}`}
			style={{
				backgroundColor: colorScheme === 'light'
					? theme.colors.elevation.level5
					: theme.colors.elevation.level2
			}}
		>
			<Image
				source={image}
				style={{ flex: 1, resizeMode: "cover", borderRadius: 10 }}
			/>
			<AppText bold className="text-xl mt-2">{title}</AppText>
			<AppText color={theme.colors.onSurfaceDisabled}>{description}</AppText>
		</View>
	)
}