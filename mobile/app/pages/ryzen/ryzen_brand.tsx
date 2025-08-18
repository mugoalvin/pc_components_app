/* eslint-disable react-hooks/exhaustive-deps */
import RyzenScrapeOptions from '@/app/components/buttomSheet/ryzenScrapeOptions'
import PageWithBottomSheet from '@/app/components/ui/bottomSheet'
import CustomSectionList from '@/app/components/view/sectionList'
import { syncRyzenInventory } from '@/app/index'
import useSnackbarContext from '@/context/SnackbarContext'
import { getSectionedRyzenData, setAsyncData } from '@/utils/functions'
import { openPage } from '@/utils/stackOptions'
import { ProductBrandFilter, RyzenDeviceChipsOptions } from '@/utils/types'
import useRyzenStore from '@/zustand/amd/ryzen'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Portal, useTheme } from 'react-native-paper'
import { Ryzen } from '../../../../packages/interfaces'
import { GraphicsBrandArray, ProcessorsArray, RyzenSeriesEnum } from '../../../../packages/types'
import ChipCustom from '../../components/buttons/chips'
import HeaderBackArrow from '../../components/headerBackArrow'
import Body from '../../components/ui/body'
import ChipView from '../../components/ui/chipView'
import AppText from '@/app/components/texts/appText'
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function RyzenBrand() {
	const theme = useTheme()
	const navigator = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand } = params

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)
	const [isScrapingInProgress, setIsScrapingInProgress] = useState<boolean>(false)

	const [chipPressed, setChipPressed] = useState<RyzenDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isLaptopSelected, setIsLaptopChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsLaptopChipSelected(false)
	}

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)

	const ryzenInventory: Ryzen[] = useRyzenStore(state => state.ryzen_inventory) || []

	const syncRyzen = async () => {
		try {
			await syncRyzenInventory()
		}
		catch (err: any) {
			showSnackbar({
				message: err.message,
				isError: true
			})
		}
	}

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
			headerTitle: "Ryzen",
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => (
				<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={openSheet}>
					<Ionicons name='cloud-download-outline' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)
		})
	}, [navigator])

	useEffect(() => {
		syncRyzen()
	}, [])


	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<RyzenScrapeOptions sheetRef={bottomSheetRef} setIsScrapingInProgress={setIsScrapingInProgress} />}
		>

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
								ryzenInventory.filter(ryzen => (ryzen.device)?.toLowerCase() === chipPressed),
							chipPressed
						)
					}
					isPageRefreshing={isPageRefreshing}
					onItemPress={(item) => {
						AsyncStorage.setItem("sectionDevice", item.device)
						openPage({
							selectedComponent: Number(selectedComponent),
							brand: Number(brand),
							amdSeries: Number(RyzenSeriesEnum[item.amdSeries as keyof typeof RyzenSeriesEnum]),
						})
					}
					}
					onrefresh={() => {
						setIsPageRefreshing(true)
						syncRyzen()
						setIsPageRefreshing(false)
					}}
				/>

				{
					isScrapingInProgress &&
					<Portal>
						<View className='flex-1 items-center justify-center gap-5' style={{ backgroundColor: theme.colors.onSurfaceDisabled }}>
							<ActivityIndicator />
							<AppText className='text-xl'>Scraping in progress...{'\n'}Don't worry if it seems stuck.</AppText>
						</View>
					</Portal>
				}
			</Body>
		</PageWithBottomSheet>
	)
}