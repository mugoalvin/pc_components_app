// import { dummyProcessorsData } from '@/utils/dummyData/brand'
import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'

import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { IntelCore, IntelCoreUltra } from '../../../../../packages/interfaces'
import AppText from '../../texts/appText'
import SubTitle from '../../texts/subTitle'
import { getIntelCoreSpecs, getIntelUltraSpecs } from '@/utils/brands/processorsBrands'

interface IntelSpecifications {
	coreData: IntelCore | IntelCoreUltra
	animationDelay: number
}
export default function IntelSpecifications({ coreData, animationDelay }: IntelSpecifications) {
	const theme = useTheme()
	const isUltra = (coreData.name as string).toLowerCase().includes('ultra')
	

	return (
		<View>
			<SubTitle bold enteringAnimation={FadeInRight.springify().delay(animationDelay)}>Specifications</SubTitle>

			<FlatGrid
				data={isUltra ? getIntelUltraSpecs(coreData) : getIntelCoreSpecs(coreData)}
				renderItem={({ item, index }) =>
					<Animated.View className='p-3 rounded-lg justify-between min-h-[60]' entering={FadeInDown.duration(500).delay(animationDelay + 300 + (index + 1) * 200)} style={{ backgroundColor: theme.colors.elevation.level2 }}>
						<AppText className='text-xl text-right' color={theme.colors.onSurfaceDisabled}>{item.title}</AppText>
						<AppText className='text-5xl text-center'>{item.info}</AppText>
					</Animated.View>
				}
				itemDimension={150}
			/>
		</View>
	)
}