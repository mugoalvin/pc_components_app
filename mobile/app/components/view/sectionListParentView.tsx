import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

interface SectionListParentViewProps {
	children: ReactNode
}

export default function SectionListParentView({ children }: SectionListParentViewProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<Animated.View
			className='px-3 rounded-xl mb-5'
			style={{
				backgroundColor:
					colorScheme === 'light'
						? theme.colors.elevation.level3
						: theme.colors.elevation.level2,
			}}
		>
			{children}
		</Animated.View>
	)
}