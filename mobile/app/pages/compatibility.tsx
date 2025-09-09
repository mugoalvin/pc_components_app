import React from 'react'
import { FlatList, View } from 'react-native'
import { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import SubTitle from '../components/texts/subTitle'
import TextPoints from '../components/texts/textPoints'

interface CompatibilityProps {
	compatibles?: string[]
	animationDelay: number
}
export default function Compatibility({ compatibles, animationDelay }: CompatibilityProps) {
	return (
		<View>
			<SubTitle bold className='mb-2' enteringAnimation={FadeInRight.springify().delay(animationDelay)}>Extra Information</SubTitle>

			<View>
				<FlatList
					data={compatibles}
					renderItem={({ item, index }) =>
						<TextPoints text={item} enteringAnimation={FadeInLeft.delay(animationDelay + (200 * index) + 200)} animationDelay={animationDelay + (200 * index)} />
					}
				/>
			</View>
		</View>
	)
}