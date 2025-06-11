import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import AppText from '../texts/appText'

interface ButtonCustomProps {
	backgroundColor?: string
	btnText: string
	center?: boolean
	color?: string
	onPress?: () => void
}

const ButtonCustom = ({ backgroundColor, btnText, center = true, color, onPress }: ButtonCustomProps) => {
	const theme = useTheme()

	return (
		<TouchableOpacity
			className={`px-2 h-10 justify-center rounded-md ${center && "items-center"}`}
			style={{ backgroundColor: backgroundColor || theme.colors.primary }}
			onPress={onPress}
		>
			<AppText
				bold
				className='text-xl'
				color={color || theme.colors.onPrimary}
			>
				{btnText}
			</AppText>

		</TouchableOpacity>
	)
}

export default ButtonCustom