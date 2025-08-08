import React, { ReactNode } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface BodyProps {
	children?: ReactNode
	className?: string
}

export default function Body({ children, className }: BodyProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<SafeAreaView
			className={`flex-1 ${className}`}
			style={{
				backgroundColor: colorScheme === 'light' ? theme.colors.elevation.level0 : theme.colors.background,
				padding: 10,
				gap: 20
			}}>
			<StatusBar
				barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
				backgroundColor={colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background}
			/>
			{children}
		</SafeAreaView>
	)
}