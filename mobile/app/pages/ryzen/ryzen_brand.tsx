/* eslint-disable react-hooks/exhaustive-deps */
import { getSectionedRyzenData, setAsyncData } from '@/utils/functions'
import { openPage } from '@/utils/stackOptions'
import { ProductBrandFilter, RyzenDeviceChipsOptions, SectionedDataItem } from '@/utils/types'
import useRyzenStore from '@/zustand/amd/ryzen'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SectionList, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { GraphicsBrandArray, ProcessorsArray, RyzenSeriesEnum } from '../../../../packages/types'
import ChipCustom from '../../components/buttons/chips'
import ProductOverviewCard from '../../components/cards/productOverviewCard'
import HeaderBackArrow from '../../components/headerBackArrow'
import AppText from '../../components/texts/appText'
import Body from '../../components/ui/body'
import ChipView from '../../components/ui/chipView'


export default function RyzenBrand() {
	const theme = useTheme()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	const navigator = useNavigation()
	const { selectedComponent, brand } = params

	const [chipPressed, setChipPressed] = useState<RyzenDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isLaptopSelected, setIsLaptopChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsLaptopChipSelected(false)
	}

	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const [sectionedRyzenData, setSectionedRyzenData] = useState<SectionedDataItem[]>([])


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
			<ChipView>
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
					selected={isDesktopSelected}
					onPress={() => {
						falsifyAllChips()
						setIsDesktopChipSelected(prev => !prev)
						setChipPressed('desktop')
					}}
				/>
				<ChipCustom
					chipText='Laptop'
					selected={isLaptopSelected}
					onPress={async () => {
						falsifyAllChips()
						setIsLaptopChipSelected(prev => !prev)
						setChipPressed('laptop')
					}}
				/>
			</ChipView>

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
					<View className='px-2 rounded-xl'
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
										// @ts-expect-error
										amdSeries: Number(RyzenSeriesEnum[item.amdSeries] || 0),
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