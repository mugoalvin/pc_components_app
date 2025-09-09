import { ReactNode } from "react";
import { FlatList } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

interface IconButtonProps {
	icon: ReactNode
	onPress?: () => void
}

interface HeaderRightIconProps {
	buttons: IconButtonProps[]
}

export default function HeaderRightIconButtons({ buttons }: HeaderRightIconProps) {
	const theme = useTheme()

	return (
		<FlatList
			horizontal
			data={buttons}
			renderItem={({ item }) =>
				<IconButton
					icon={() => item.icon}
					onPress={item.onPress}
					hitSlop={10}
					style={{
						backgroundColor: theme.colors.elevation.level5
					}}
				/>
			}
		/>
	)
}