import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

import AppText from "../../texts/appText";

interface CoreComponentsProps {
	icon?: string
	title?: string
	extra?: string
	full?: boolean
	onPress?: () => void
}

export default function CoreComponents( {icon, title, extra, full, onPress}: CoreComponentsProps ) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<Pressable
			className={`flex-row ${ full ? 'w-full' :  'w-[49%]'} max-h-28 item-center rounded-xl`}
			style={{ backgroundColor: colorScheme === 'light'? theme.colors.elevation.level5 : theme.colors.elevation.level2 }}
			android_ripple={{
				color: theme.colors.secondaryContainer,
				foreground: false,
			}}
			onPress={onPress}
			>
			<View className='h-full aspect-[2/3] items-center justify-center'>
				<MaterialIcons
					// @ts-expect-error
					name={icon}
					size={50}
					color={theme.colors.onSecondaryContainer}
				/>
			</View>
			<View className="justify-center">
				<AppText bold className="text-2xl">{title}</AppText>
				<AppText className="text-lg" color={theme.colors.onSurfaceDisabled}>{extra}</AppText>
			</View>
		</Pressable>
	)	
}