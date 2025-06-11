import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import AppText from './appText'

interface TextPointsProps {
	text?: string
	color?: string
}

export default function TextPoints({ color, text } : TextPointsProps) {
	const theme = useTheme()

	return (
		<View className='flex-row items-center'>
			<View className='h-2 aspect-square rounded-full m-3' style={{ backgroundColor: color || theme.colors.primary }} />
			<AppText>{text}</AppText>
		</View>
	)
}