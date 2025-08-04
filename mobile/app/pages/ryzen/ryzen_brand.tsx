/* eslint-disable react-hooks/exhaustive-deps */
import CustomSectionList from '@/app/components/view/sectionList'
import { syncRyzenInventory } from '@/app/index'
import { getSectionedRyzenData, setAsyncData } from '@/utils/functions'
import { openPage } from '@/utils/stackOptions'
import { ProductBrandFilter, RyzenDeviceChipsOptions } from '@/utils/types'
import useRyzenStore from '@/zustand/amd/ryzen'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Ryzen } from '../../../../packages/interfaces'
import { GraphicsBrandArray, ProcessorsArray, RyzenSeriesEnum } from '../../../../packages/types'
import ChipCustom from '../../components/buttons/chips'
import HeaderBackArrow from '../../components/headerBackArrow'
import Body from '../../components/ui/body'
import ChipView from '../../components/ui/chipView'


export default function RyzenBrand() {
	const theme = useTheme()
	const navigator = useNavigation()
	const colorScheme = useColorScheme()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	const { selectedComponent, brand } = params

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const [chipPressed, setChipPressed] = useState<RyzenDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isLaptopSelected, setIsLaptopChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsLaptopChipSelected(false)
	}

	const ryzenInventory: Ryzen[] = useRyzenStore(state => state.ryzen_inventory) || []

	const ProductsArray: string[] =
		String(selectedComponent) === "0" ? ProcessorsArray :
			String(selectedComponent) === "1" ? GraphicsBrandArray :
				[]

	useEffect(() => {
		setAsyncData('chipPressed', chipPressed)
	}, [chipPressed])

	useEffect(() => {
		navigator.setOptions({
			title: ProductsArray[brand ? brand : 0],
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	}, [navigator])

	useEffect(() => {
		syncRyzenInventory()
	})


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

			<CustomSectionList
				sections={
					getSectionedRyzenData(
						chipPressed === 'all' ?
							ryzenInventory :
							ryzenInventory.filter(ryzen => (ryzen.device)?.toLowerCase() === chipPressed)
					)
				}
				isPageRefreshing={isPageRefreshing}
				onItemPress={(item) => openPage({
					selectedComponent: Number(selectedComponent),
					brand: Number(brand),
					amdSeries: Number(RyzenSeriesEnum[item.amdSeries as keyof typeof RyzenSeriesEnum]),
				})}
				onrefresh={async () => {
					setIsPageRefreshing(true)
					await syncRyzenInventory()
					setIsPageRefreshing(false)
				}}
			/>

		</Body>
	)
}