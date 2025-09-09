import { ReactNode } from 'react'
import { useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'

export interface AppTextProps {
	enteringAnimation?: object
	bold?: boolean
	children?: ReactNode
	color?: string
	className?: string
	bg_color?: string
	numberOfLines?: number
	ellipsizeMode?: "head" | "middle" | "tail" | "clip"
}

export default function AppText({ enteringAnimation, bold, bg_color, children, color, className, ellipsizeMode, numberOfLines }: AppTextProps) {
	const theme = useTheme()

	return (
		<Animated.Text // @ts-expect-error
			entering={enteringAnimation}
			numberOfLines={numberOfLines}
			ellipsizeMode={ellipsizeMode}
			 	// ${bold ? "font-zain_bold" : "font-zain"}
			className={`
			 	${bold ? "font-josefin_sans_bold" : "font-josefin_sans"}
				${className}
			`}
			style={{
				color: color || theme.colors.onBackground,
				backgroundColor: bg_color
			}}
		>
			{children}
		</Animated.Text>
	)
}