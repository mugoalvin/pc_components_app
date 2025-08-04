import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

interface SectionListParentViewProps {
	children: ReactNode
}
export default function SectionListParentView({ children } : SectionListParentViewProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<View
			className='px-2 rounded-xl'
			style={{
				backgroundColor: colorScheme === 'light'
					? theme.colors.elevation.level5
					: theme.colors.elevation.level2,
			}}
		>
			{ children }
		</View>
	)
}