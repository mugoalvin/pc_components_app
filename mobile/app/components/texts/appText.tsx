import { ReactNode } from 'react'
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'

export interface AppTextProps {
	bold?: boolean
	children?: ReactNode
	color?: string
	className?: string
	bg_color?: string
	numberOfLines?: number
	ellipsizeMode?: "head" | "middle" | "tail" | "clip"
}

export default function AppText({bold, bg_color, children, color, className, ellipsizeMode, numberOfLines }: AppTextProps) {
	const theme = useTheme()

	return (
		<Text
			numberOfLines={numberOfLines}
			ellipsizeMode={ellipsizeMode}
			className={`
			 	${bold ? "font-zain_bold" : "font-zain"}
				${className}
			`}
			style={{
				color: color || theme.colors.onBackground,
				backgroundColor: bg_color
			}}
		>
			{children}
		</Text>
	)
}