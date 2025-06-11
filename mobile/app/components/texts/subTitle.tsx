import AppText, { AppTextProps } from "./appText";


export default function SubTitle({ bold, children, className }: AppTextProps) {
	return (
		<AppText
			bold={bold}
			className={`text-3xl ${className}`}
		>
			{children}
		</AppText>
	)
}