import { dummyProcessorsData } from '@/utils/dummyData/brand'
import { makeKeyUserFriendly } from '@/utils/functions'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import AppText from '../texts/appText'
import SubTitle from '../texts/subTitle'

export default function Specifications() {
	const theme = useTheme()
	const processedDummyData = Object.keys(dummyProcessorsData[0]).filter(key => key !== 'image')

	return (
		<View className='mb-5'>
			<SubTitle bold className='mb-5'>Specifications</SubTitle>
			{
				processedDummyData?.map((item, index) => (
					<Fragment key={item}>
						{index !== 0 && <Divider bold className='my-2' />}
 						<View className='flex-row justify-between items-center h-10'>
							<AppText bold color={theme.colors.onSurfaceVariant}>{makeKeyUserFriendly(item)}</AppText>
							{/* @ts-ignore */}
							<AppText>{dummyProcessorsData[0][item]}</AppText>
						</View>
					</Fragment>
				))
			}
		</View>
	)
}