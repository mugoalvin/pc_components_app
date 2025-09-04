import { ReactNode } from "react";
import { Pressable, useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

interface BasicCardProps {
	children: ReactNode
	className?: string
	hasTransparentBackground?: boolean
	onPress?: () => void
}

export default function BasicCard({ children, className, hasTransparentBackground, onPress }: BasicCardProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<Pressable
			className={className}
			onPress={onPress}
			android_ripple={{
				color: theme.colors.secondaryContainer
			}}
			style={{
				backgroundColor: hasTransparentBackground ? "transparent" : colorScheme === 'light' ? "white" : theme.colors.elevation.level2
			}}>
			{children}
		</Pressable>
	)
}