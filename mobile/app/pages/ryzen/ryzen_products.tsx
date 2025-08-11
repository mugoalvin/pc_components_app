/* eslint-disable react-hooks/exhaustive-deps */
import ChipView from "@/app/components/ui/chipView";
import { filterRyzenWithPerformanceTier } from "@/utils/functions";
import { ProductBrandFilter, RyzenDeviceChipsOptions, RyzenTierChipsOptions } from "@/utils/types";
import useRyzenStore from "@/zustand/amd/ryzen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Divider, Menu, useTheme } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AmdDevice, RyzenDesktopSeries, RyzenLaptopSeries, RyzenSeriesArray, RyzenSeriesNameArray, RyzenSeriesNameEnum } from "../../../../packages/types";

import useSnackbarContext from "@/context/SnackbarContext";
import ChipCustom from "../../components/buttons/chips";
import ProductCard from "../../components/cards/productCard";
import HeaderBackArrow from "../../components/headerBackArrow";
import AppText from "../../components/texts/appText";
import SubTitle from "../../components/texts/subTitle";
import Body from "../../components/ui/body";
import SearchBarCustom from "../../components/ui/searchBarCustom";
import { syncRyzenInventory } from "../../index";
import { scrapeRyzen } from "../../services/scrape";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import SelectDeviceOptions from "@/app/components/buttomSheet/selectDeviceOptions";


export default function RyzenProducts() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()

	// @ts-expect-error
	const { amdSeries } = useLocalSearchParams() as Partial<ProductBrandFilter>

	const [isSearchBtnPressed, setIsSearchBtnPressed] = useState<boolean>(false)
	const [isScrapingInProgress, setIsScrapingInProgress] = useState<boolean>(false)
	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const [ryzenToDisplay, setRyzenToDisplay] = useState(ryzenInventory)

	const [isFlatlistIsReloading, setIsFlatlistIsReloading] = useState<boolean>(false)

	const [deviceSelected, setDeviceSelected] = useState<RyzenDeviceChipsOptions>('all')
	const [itemDevice, setItemDevice] = useState<RyzenDeviceChipsOptions>('all')

	const [chipPressed, setChipPressed] = useState<RyzenTierChipsOptions>('all')
	const [isAllChipClicked, setIsAllChipClicked] = useState<boolean>(true)
	const [isRyzen9ChipClicked, setIsRyzen9ChipClicked] = useState<boolean>(false)
	const [isRyzen7ChipClicked, setIsRyzen7ChipClicked] = useState<boolean>(false)
	const [isRyzen5ChipClicked, setIsRyzen5ChipClicked] = useState<boolean>(false)
	const [isRyzen3ChipClicked, setIsRyzen3ChipClicked] = useState<boolean>(false)

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)
	const closeSheet = () => bottomSheetRef.current?.close()

	const falsifyAllChips = () => {
		setIsAllChipClicked(false)
		setIsRyzen9ChipClicked(false)
		setIsRyzen7ChipClicked(false)
		setIsRyzen5ChipClicked(false)
		setIsRyzen3ChipClicked(false)
	}

	const getAsyncData = async () => {
		const device = await AsyncStorage.getItem('chipPressed') as RyzenDeviceChipsOptions
		const itemDevice = await AsyncStorage.getItem("sectionDevice") as RyzenDeviceChipsOptions

		setDeviceSelected(device)
		setItemDevice(itemDevice)
	}

	const sourceData = async () => {
		const successMsg = await scrapeRyzen({
			isLaptop: deviceSelected === "all" ?
				itemDevice === 'laptop' ? AmdDevice.Laptop : AmdDevice.Desktop :
				deviceSelected === 'laptop' ? AmdDevice.Laptop : AmdDevice.Desktop,
			series: amdSeries
		})
		await syncRyzenInventory()
		showSnackbar({
			message: successMsg
		})
	}

	useEffect(() => {
		getAsyncData()
	}, [])

	useEffect(() => {
		navigation.setOptions({
			title: RyzenSeriesNameEnum[amdSeries],
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => (
				<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={() => setIsSearchBtnPressed(prev => !prev)}>
					<Ionicons name={isSearchBtnPressed ? 'close-outline' : 'search-outline'} size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)

		})

		setRyzenToDisplay(
			filterRyzenWithPerformanceTier(
				(deviceSelected === 'all' ?
					ryzenInventory :
					ryzenInventory.filter(ryzen => (ryzen.device)?.toLowerCase() === deviceSelected)
				).filter(ryzen => ryzen.series === RyzenSeriesNameEnum[amdSeries]),
				chipPressed
			)
		)
	}, [amdSeries, chipPressed, isSearchBtnPressed, ryzenInventory, deviceSelected])


	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<SelectDeviceOptions device={itemDevice} setDevice={setItemDevice} onPress={sourceData} closeSheet={closeSheet} />}
		>
			<Body>
				{isSearchBtnPressed && <SearchBarCustom focused />}

				<ChipView>
					<ChipCustom chipText="All" selected={isAllChipClicked} onPress={() => {
						falsifyAllChips()
						setIsAllChipClicked(prev => !prev)
						setChipPressed('all')
					}} />
					<ChipCustom chipText="Ryzen 9" selected={isRyzen9ChipClicked} onPress={() => {
						falsifyAllChips();
						setIsRyzen9ChipClicked(prev => !prev);
						setChipPressed('9')
					}}
					/>
					<ChipCustom chipText="Ryzen 7" selected={isRyzen7ChipClicked} onPress={() => {
						falsifyAllChips();
						setIsRyzen7ChipClicked(prev => !prev);
						setChipPressed('7')
					}}
					/>
					<ChipCustom chipText="Ryzen 5" selected={isRyzen5ChipClicked} onPress={() => {
						falsifyAllChips();
						setIsRyzen5ChipClicked(prev => !prev);
						setChipPressed('5')
					}}
					/>
					<ChipCustom chipText="Ryzen 3" selected={isRyzen3ChipClicked} onPress={() => {
						falsifyAllChips();
						setIsRyzen3ChipClicked(prev => !prev);
						setChipPressed('3')
					}}
					/>
				</ChipView>


				<Animated.FlatList
					itemLayoutAnimation={LinearTransition}
					showsVerticalScrollIndicator={false}
					className="flex-1"
					data={ryzenToDisplay}
					keyExtractor={item => item.name}
					refreshControl={
						<RefreshControl
							refreshing={isFlatlistIsReloading}
							onRefresh={async () => {
								// try {
								// 	if (deviceSelected === 'all' && itemDevice === "all") {
								// 		openSheet()
								// 	}
								// 	else {
								// 		sourceData()
								// 	}
								// }
								// catch (error: any) {
								// 	console.log(error)
								// 	showSnackbar({
								// 		message: error.errMsg || error.errTitle || "Unknown Error!",
								// 		isError: true
								// 	})
								// }

								syncRyzenInventory()
							}}
						/>
					}
					renderItem={({ item }) => (
						<ProductCard
							key={item.name}
							title={item.name}
							mainDescription={`${item.number_of_cpu_cores} cores ${item.number_of_threads} threads`}
							secondaryDescription={`${item.max_boost_clock} boost frequency`}
							extraInfo={item.launch_date}
							onPress={() =>
								router.push({
									pathname: './product_details',
									params: { processor: JSON.stringify(item) }
								})
							}
						/>
					)}
					ItemSeparatorComponent={() => <Divider bold />}
					ListEmptyComponent={() => (
						<View className="aspect-square items-center justify-around">
							<MaterialCommunityIcons name="gesture-swipe-down" size={40} color={theme.colors.tertiary} />
							<SubTitle>Pull To Refresh</SubTitle>
						</View>
					)}
				/>
			</Body>
		</PageWithBottomSheet>
	)
}