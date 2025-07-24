import React from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'react-native-paper'
import AppText from '../texts/appText'

interface ButtonCustomProps {
	backgroundColor?: string
	btnText: string
	center?: boolean
	className?: string
	color?: string
	rippleColor?: string
	onPress?: () => void
}

const ButtonCustom = ({ backgroundColor, btnText, center = true, className, color, rippleColor, onPress }: ButtonCustomProps) => {
	const theme = useTheme()

	return (
		<Pressable
			className={`px-2 h-10 justify-center rounded-md ${center && "items-center"} ${className}`}
			style={{ backgroundColor: backgroundColor || theme.colors.primary }}
			onPress={onPress}
			android_ripple={{
				color: rippleColor || theme.colors.secondaryContainer,
			}}
		>
			<AppText
				bold
				className='text-xl'
				color={color || theme.colors.onPrimary}
			>
				{btnText}
			</AppText>

		</Pressable>
	)
}

export default ButtonCustom