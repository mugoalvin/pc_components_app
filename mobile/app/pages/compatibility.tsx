import React from 'react'
import { View } from 'react-native'
import SubTitle from '../components/texts/subTitle'
import TextPoints from '../components/texts/textPoints'

interface CompatibilityProps {
	data?: any
}
export default function Compatibility({ data }: CompatibilityProps) {

	return (
		<View>
			<SubTitle bold>Compatibility</SubTitle>

			<View>
				<TextPoints text={`${ data.cpu_socket } Socket`} />
			</View>
		</View>
	)
}