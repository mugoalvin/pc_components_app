/* eslint-disable react-hooks/exhaustive-deps */
import { getSectionedRyzenData } from '@/utils/functions'
import { openPage } from '@/utils/stackOptions'
import { ProductBrandFilter, RyzenDeviceChipsOptions, SectionedRyzenDataItem } from '@/utils/types'
import useRyzenStore from '@/zustand/amd/ryzen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SectionList, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { GraphicsBrandArray, IntelProcessorLine, ProcessorsArray, RyzenSeriesEnum } from '../../../packages/types'
import ChipCustom from '../components/buttons/chips'
import ProductOverviewCard from '../components/cards/productOverviewCard'
import HeaderBackArrow from '../components/headerBackArrow'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'


export default function Brand() {
	const theme = useTheme()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	const navigator = useNavigation()
	const { selectedComponent, brand } = params

	const [chipPressed, setChipPressed] = useState<RyzenDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isLaptopSelected, setIsLaptopChipSelected] = useState<boolean>(false)


	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const [sectionedRyzenData, setSectionedRyzenData] = useState<SectionedRyzenDataItem[]>([])

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsLaptopChipSelected(false)
	}

	const setAsyncData = async (key: string, value: string) => {
		await AsyncStorage.setItem(key, value)
	}

	const ProductsArray: string[] =
		String(selectedComponent) === "0" ? ProcessorsArray :
			String(selectedComponent) === "1" ? GraphicsBrandArray :
				[]

	useEffect(() => {
		setAsyncData('chipPressed', chipPressed)

		setSectionedRyzenData(
			getSectionedRyzenData(
				chipPressed === 'all' ?
					ryzenInventory :
					ryzenInventory.filter(ryzen => (ryzen.device)?.toLowerCase() === chipPressed)
			)
		)
	}, [chipPressed, ryzenInventory])

	useEffect(() => {
		navigator.setOptions({
			title: ProductsArray[brand ? brand : 0],
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})

	}, [navigator])


	return (
		<Body>
			<View className='flex-row gap-2 flex-wrap'>
				<ChipCustom
					chipText='All'
					selected={isAllSelected}
					onPress={() => {
						falsifyAllChips()
						setIsAllChipSelected(prev => !prev)
						setChipPressed('all')
					}}
				/>
				<ChipCustom
					chipText='Desktop'
					// icon="monitor"
					selected={isDesktopSelected}
					onPress={() => {
						falsifyAllChips()
						setIsDesktopChipSelected(prev => !prev)
						setChipPressed('desktop')
					}}
				/>
				<ChipCustom
					chipText='Laptop'
					// icon="laptop"
					selected={isLaptopSelected}
					onPress={async () => {
						falsifyAllChips()
						setIsLaptopChipSelected(prev => !prev)
						setChipPressed('laptop')
					}}
				/>
			</View>

			<SectionList
				sections={sectionedRyzenData}
				keyExtractor={(item, index) => item.name + index}
				renderSectionHeader={({ section: { title } }) => (
					<AppText
						key={title}
						bg_color={theme.colors.surface}
						bold
						className='text-2xl pt-4 mb-2'
						color={theme.colors.onBackground}
					>
						{title}
					</AppText>
				)}
				renderItem={() => null}

				renderSectionFooter={({ section }) => (
					<View className='p-2 rounded-xl'
						style={{ backgroundColor: theme.colors.elevation.level1 }}
					>
						{
							(section.data).map((item, index) =>
								<ProductOverviewCard
									key={index}
									title={item.name}
									index={index}
									series={item.tableColumnData}
									lastUpdated={item.lastUpdated}
									productCount={item.count}
									onPress={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: Number(brand),
										...(
											// @ts-ignore
											Number(brand) === 0 && { amdSeries: Number(RyzenSeriesEnum[item.amdSeries]) || 0 } ||
											Number(brand) === 1 && { line: Number(IntelProcessorLine.Ultra) }
										)
									})}
								/>
							)
						}
					</View>
				)}
				stickySectionHeadersEnabled
			/>
		</Body>
	)
}