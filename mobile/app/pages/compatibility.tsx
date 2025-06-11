import React from 'react'
import { View } from 'react-native'
import SubTitle from '../components/texts/subTitle'
import TextPoints from '../components/texts/textPoints'

export default function Compatibility() {

	return (
		<View>
			<SubTitle bold className='mb-2'>Compatibility</SubTitle>

			<View>
				<TextPoints text='LGA 1700 motherboards' />
				<TextPoints text='600/700 series chipsets' />
				<TextPoints text='DDR5 memory recommended' />
			</View>
		</View>
	)
}