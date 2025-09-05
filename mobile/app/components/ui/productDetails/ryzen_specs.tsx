// import { dummyProcessorsData } from '@/utils/dummyData/brand'
import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'

import { Ryzen } from '../../../../../packages/interfaces'
import AppText from '../../texts/appText'
import SubTitle from '../../texts/subTitle'

interface RyzenSpecifications {
	ryzenData: Ryzen
}
export default function RyzenSpecifications({ ryzenData }: RyzenSpecifications) {
	const theme = useTheme()

	const dataInCards = [
		{
			title: "Cores",
			info: ryzenData.number_of_cpu_cores,
		},
		{
			title: "Threads",
			info: ryzenData.number_of_threads,
		},
		{
			title: "Max Turbo Clock",
			info: String(ryzenData.max_boost_clock).replace(/^\s*up to\s*/i, ""),
		},
		{
			title: "Power Requirement",
			info: ryzenData.default_tdp,
		},
		{
			title: "Base Clock Speed",
			info: ryzenData.base_clock,
		}
	]

	return (
		<View className='mb-5'>
			<SubTitle bold
			>Specifications</SubTitle>

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