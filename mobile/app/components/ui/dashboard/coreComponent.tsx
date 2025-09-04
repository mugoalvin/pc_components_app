import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AppText from "../../texts/appText";
import BasicCard from "../../view/basicCard";

type library = "MaterialIcons" | "FontAwesome6" | "MaterialCommunityIcons"

interface CoreComponentProps {
	iconLib: library
	icon?: string
	title?: string
	extra?: string
	full?: boolean
	onPress?: () => void
}

export default function CoreComponent({ iconLib, icon, title, extra, full, onPress }: CoreComponentProps) {
	const theme = useTheme()

	return (
		<BasicCard
			className={`flex-row ${full ? 'w-full' : 'w-[49%]'} max-h-28 item-center rounded-xl`}
			onPress={onPress}
		>
			<View className='h-full aspect-[2/3] items-center justify-center'>
				{
					iconLib == "MaterialIcons" &&
					<MaterialIcons
						// @ts-expect-error
						name={icon}
						size={50}
						color={theme.colors.onSecondaryContainer}
					/>
				}
				{
					iconLib == "FontAwesome6" &&
					<FontAwesome
						// @ts-expect-error
						name={icon}
						size={40}
						color={theme.colors.onSecondaryContainer}
					/>
				}
				{
					iconLib === "MaterialCommunityIcons" &&
					<MaterialCommunityIcons
						// @ts-expect-error
						name={icon}
						size={40}
						color={theme.colors.onSecondaryContainer}
					/>
				}
			</View>
			<View className="justify-center flex-1 pr-3">
				<AppText bold className="text-2xl">{title}</AppText>
				{
					extra &&
					<AppText className="text-lg" color={theme.colors.onSurfaceDisabled} numberOfLines={1} ellipsizeMode="tail">{extra}</AppText>
				}
			</View>
		</BasicCard>
	)
}