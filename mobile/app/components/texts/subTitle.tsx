import { useTheme } from "react-native-paper";
import AppText, { AppTextProps } from "./appText";


export default function SubTitle({ bold, children, className, color, enteringAnimation }: AppTextProps) {
	const theme = useTheme()

	return (
		<AppText
			bold={bold}
			color={color || theme.colors.tertiary}
			className={`text-3xl ${className}`}
			enteringAnimation={enteringAnimation}
		>
			{children}
		</AppText>
	)
}