import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

interface HeaderProps {
	title: string
}

export default function Header({title}: HeaderProps) {
	const theme = useTheme()

	return (
		<View
			className='px-5 h-16 justify-center'
			style={{ backgroundColor: theme.colors.background }}
		>
			<Text className="font-zain text-4xl" style={{ color: theme.colors.primary }}>
				{title}
			</Text>
		</View>
	)
}