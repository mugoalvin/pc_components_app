// import { dummyProcessorsData } from '@/utils/dummyData/brand'
import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'

import { IntelCore } from '../../../../../packages/interfaces'
import AppText from '../../texts/appText'
import SubTitle from '../../texts/subTitle'

interface IntelSpecifications {
	coreData: IntelCore
}
export default function IntelSpecifications({ coreData }: IntelSpecifications) {
	const theme = useTheme()

	const dataInCards = [
		{
			title: "Cores",
			info: coreData.total_cores
		},
		{
			title: "Threads",
			info: coreData.total_threads
		},
		{
			title: "Max Turbo Clock",
			info: String(coreData.max_turbo_frequency).replace(/^\s*up to\s*/i, ""),
		},
		{
			title: "Power Requirement",
			info: coreData.tdp,
		},
	]

	return (
		<View>
			<SubTitle bold>Specifications</SubTitle>

			<FlatGrid
				data={dataInCards}
				renderItem={({ item }) =>
					<View className='p-3 rounded-lg justify-between min-h-[60]' style={{ backgroundColor: theme.colors.elevation.level2 }}>
						<AppText className='text-xl text-right' color={theme.colors.onSurfaceDisabled}>{item.title}</AppText>
						<AppText className='text-5xl text-center'>{item.info}</AppText>
					</View>
				}
				itemDimension={150}
			/>
		</View>
	)
}