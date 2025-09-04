import { Image } from "expo-image"
import { useColorScheme } from "react-native"
import { useTheme } from "react-native-paper"

import AppText from "../../texts/appText"
import BasicCard from "../../view/basicCard"

interface NewPartsProps {
	image?: string
	title?: string
	description?: string
	index?: number
	onPress?: () => void
}

export default function NewParts({ image, title, description, index, onPress }: NewPartsProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<BasicCard
			onPress={onPress}
			className={`w-36 rounded-xl p-3 ${index !== 0 && 'ml-2'}`}
		>
			<Image
				source={image}
				style={{ resizeMode: "cover", borderRadius: 8, width: '100%', aspectRatio: 1 }}
			/>
			<AppText bold className="text-xl mt-2">{title}</AppText>
			<AppText color={theme.colors.onSurfaceDisabled}>{description}</AppText>
		</BasicCard>
	)
}