import React, { ReactNode } from 'react'
import { useColorScheme, View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface RowProps {
	children: ReactNode
}

export default function Row ({children}: RowProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme() || "dark"

	return (
		<View className="mb-5 max-w-full flex-row justify-between" style={{ backgroundColor: colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background, gap: 15 }}>
			{children}
		</View>
	)
}