import { ReactNode } from 'react'
import { Text } from 'react-native'
import { useTheme } from 'react-native-paper'

interface TextInputLabelProps {
	children?: ReactNode
	color?: string
}

export default function TextInputLabel({ children, color }: TextInputLabelProps) {
	const theme = useTheme()

	return (
		<Text
			className='font-zain text-xl'
			style={{ color: color || theme.colors.secondary }}
		>
			{children}
		</Text>
	)
}