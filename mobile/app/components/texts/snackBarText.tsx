import { Text } from "react-native"
import { useTheme } from "react-native-paper"
import { AppTextProps } from "./appText"

export default function SnackBarText({ bold, className, color, bg_color, children }: AppTextProps) {
	const theme = useTheme()

	return (
		<Text
			className={`
				text-lg
				${bold ? "font-zain_bold" : "font-zain"}
				${className}
			`}
			style={{
				// color: color || theme.colors.elevation.level3,
				color: color || theme.colors.inverseOnSurface,
				backgroundColor: bg_color
			}}
		>
			{children}
		</Text>
	)}