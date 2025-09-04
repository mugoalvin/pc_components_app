// import { dummyProcessorsData } from '@/utils/dummyData/brand'
import { makeKeyUserFriendly } from '@/utils/functions'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import AppText from '../texts/appText'
import SubTitle from '../texts/subTitle'

interface SpecificationsProps {
	data: Record<string, any>
}
export default function Specifications({ data }: SpecificationsProps) {
	const theme = useTheme()
	const relevantComponentData = Object.keys(
		data
	).filter(
		key => 
			key !== 'image' &&
			key !== 'main' &&
			key !== 'link' &&
			key !== 'id' &&
			key !== 'name'
	)

	return (
		<View className='mb-5'>
			<SubTitle bold className='mb-5'>Specifications</SubTitle>
			{
				relevantComponentData?.map((item, index) => (
					<Fragment key={item}>
						{/* <AppText>{processedDummyData[index]}</AppText> */}
						{index !== 0 && <Divider bold className='my-2' />}
 						<View className='flex-row justify-between items-center h-10'>
							<AppText bold color={theme.colors.onSurfaceVariant}>{makeKeyUserFriendly(item)}</AppText>
							{/* @ts-ignore */}
							<AppText>{data[item]}</AppText>
						</View>
					</Fragment>
				))
			}
		</View>
	)
}