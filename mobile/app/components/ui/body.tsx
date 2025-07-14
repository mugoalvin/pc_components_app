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
	const statusBarHeight = StatusBar.currentHeight

	return (
		<SafeAreaView
			className={`flex-1 ${className}`}
			style={{
				backgroundColor: colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background,
				padding: 10,
				marginTop: statusBarHeight && statusBarHeight * -1,
				gap: 20
			}}>
			{children}
		</SafeAreaView>
	)
}