import React from 'react'
import { View } from 'react-native'
import { FadeInDown, FadeInRight } from 'react-native-reanimated'
import SubTitle from '../components/texts/subTitle'
import TextPoints from '../components/texts/textPoints'

interface CompatibilityProps {
	data?: any
}
export default function Compatibility({ data }: CompatibilityProps) {

	return (
		<View>
			<SubTitle bold enteringAnimation={FadeInRight.springify().delay(3200)}>Compatibility</SubTitle>

			<View>
				<TextPoints text={`${data.cpu_socket} Socket`} enteringAnimation={FadeInDown.delay(3600)} />
			</View>
		</View>
	)
}