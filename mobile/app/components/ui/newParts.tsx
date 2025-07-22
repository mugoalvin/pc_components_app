import { Image } from "expo-image"
import { useColorScheme, View } from "react-native"

import AppText from "../texts/appText"
import { useTheme } from "react-native-paper"

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
			className={`h-48 w-36 rounded-xl p-3 ${index !== 0 && 'ml-2'}`}
			style={{
				backgroundColor: colorScheme === 'light'
					? theme.colors.elevation.level5
					: theme.colors.elevation.level2
			}}
		>
			<Image
				source={image}
				style={{ flex: 1, resizeMode: 'center' }}
			/>
			<AppText bold className="text-xl">{title}</AppText>
			<AppText color={theme.colors.onSurfaceDisabled}>{description}</AppText>
		</View>
	)
}