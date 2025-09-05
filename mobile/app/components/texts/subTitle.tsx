import { useTheme } from "react-native-paper";
import AppText, { AppTextProps } from "./appText";


export default function SubTitle({ bold, children, className, color }: AppTextProps) {
	const theme = useTheme()

	return (
		<AppText
			bold={bold}
			color={theme.colors.tertiary}
			className={`text-3xl ${className}`}
		>
			{children}
		</AppText>
	)
}