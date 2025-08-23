import React, { ReactNode } from 'react'
import { StatusBar, useColorScheme, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import ProgressBarCustom from './customProgressBar'

interface BodyProps {
	children?: ReactNode
	className?: string
	progress?: number
}

export default function Body({ children, className, progress }: BodyProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<View
			className={`flex-1 ${className}`}
			style={{
				backgroundColor: colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background,
				paddingHorizontal: 10,
			}}>
			<StatusBar
				barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
				backgroundColor={colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background}
			/>
			<ProgressBarCustom progress={progress} />
			{children}
		</View>
	)
}