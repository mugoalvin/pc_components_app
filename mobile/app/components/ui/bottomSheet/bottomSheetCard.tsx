import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

interface BottomSheetCardProps {
	children?: ReactNode
	className?: string
}

export default function BottomSheetCard({ children, className } : BottomSheetCardProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	
	return (
		<View className={className} style={{ backgroundColor: colorScheme === 'light' ? theme.colors.inverseOnSurface : theme.colors.onSecondary }}>
			{children}
		</View>
	)
}