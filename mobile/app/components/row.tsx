import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface RowProps {
	children: ReactNode
}

export default function Row ({children}: RowProps) {
	const theme = useTheme()

	return (
		<View className="mb-5 max-w-full flex-row justify-between" style={{ backgroundColor: theme.colors.background, gap: 15 }}>
			{children}
		</View>
	)
}