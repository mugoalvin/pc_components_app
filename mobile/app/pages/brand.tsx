import { dummyAmdSeries } from '@/utils/dummyData/brand'
import { DashboardCategoryTypeEnum, ProcessorsArray, ProcessorsEnum, ProductsBrandModel } from '@/utils/types'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'

import { SectionList, TouchableOpacity, View } from 'react-native'

import { openPage } from '@/utils/stackOptions'
import { useTheme } from 'react-native-paper'
import { RyzenDesktopSeries } from '../../../packages/types'
import ChipCustom from '../components/buttons/chips'
import SeriesOrGenCard from '../components/cards/seriesOrGen'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'


export default function Brand() {
	const theme = useTheme()
	const navigator = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductsBrandModel>
	const { brand } = params
	const ProductsArray = ProcessorsArray

	useEffect(() => {
		navigator.setOptions({
			title: ProductsArray[brand || 0],
			headerLeft: () => (
				<TouchableOpacity className='w-10 h-10 justify-center' onPress={() => navigator.goBack()} >
					<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)
		})
	})


	return (
		<Body>
			<View className='flex-row gap-2 flex-wrap'>
				<ChipCustom chipText='All'  />
				<ChipCustom chipText='Desktop' icon="monitor" />
				<ChipCustom chipText='Laptop' icon="laptop" />
			</View>

			<SectionList
				sections={dummyAmdSeries}
				keyExtractor={(item, index) => item + index}
				renderSectionHeader={({ section: { title } }) => (
					<AppText
						key={title}
						bg_color={theme.colors.surface}
						bold
						className='text-2xl pt-4 mb-2'
						color={theme.colors.onBackground}
					>{title}</AppText>
				)}
				renderItem={({ item }) => null}

				renderSectionFooter={({ section }) => (
					<View className='p-2 rounded-xl'
						style={{ backgroundColor: theme.colors.elevation.level1 }}
					>
						{
							section.data.map((item, index) => <SeriesOrGenCard key={index} title={item} index={index} onPress={() => openPage({
								product: DashboardCategoryTypeEnum.Processors,
								brand: ProcessorsEnum.AMD,
								series: RyzenDesktopSeries.Series9000
							})} />)
						}
					</View>
				)}
				stickySectionHeadersEnabled
			/>
		</Body>
	)
}