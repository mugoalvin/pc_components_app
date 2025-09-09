import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, { BounceIn } from 'react-native-reanimated'
import AppText from './appText'

interface TextPointsProps {
	animationDelay: number
	text?: string
	color?: string
	enteringAnimation?: object
}

export default function TextPoints({ color, text, enteringAnimation, animationDelay }: TextPointsProps) {
	const theme = useTheme()

	return (
		<View className='flex-row items-center'>
			<Animated.View className='h-2 aspect-square rounded-full m-3' style={{ backgroundColor: color || theme.colors.primary }} entering={BounceIn.delay(animationDelay)} />
			<AppText enteringAnimation={enteringAnimation}>{text}</AppText>
		</View>
	)
}