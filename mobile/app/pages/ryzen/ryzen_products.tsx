/* eslint-disable react-hooks/exhaustive-deps */
import ChipView from "@/app/components/ui/chipView";
import { filterRyzenWithPerformanceTier } from "@/utils/functions";
import { ProductBrandFilter, RyzenDeviceChipsOptions, RyzenTierChipsOptions } from "@/utils/types";
import useRyzenStore from "@/zustand/amd/ryzen";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { AmdDevice, RyzenSeriesNameEnum } from "../../../../packages/types";

import SelectDeviceOptions from "@/app/components/buttomSheet/selectDeviceOptions";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import useSnackbarContext from "@/context/SnackbarContext";
import { useWebSocket } from "@/context/WebsockerContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ChipCustom from "../../components/buttons/chips";
import ProductCard from "../../components/cards/productCard";
import HeaderBackArrow from "../../components/headerBackArrow";
import SubTitle from "../../components/texts/subTitle";
import Body from "../../components/ui/body";
import { syncRyzenInventory } from "../../index";
import { scrapeRyzen } from "../../services/scrape";
import { Ryzen } from "../../../../packages/interfaces";

export default function RyzenProducts() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { socket } = useWebSocket()
	const { showSnackbar } = useSnackbarContext()

	const { amdSeries } = useLocalSearchParams() as Partial<ProductBrandFilter | any>

	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const [ryzenToDisplay, setRyzenToDisplay] = useState<Ryzen[]>([])

	const [isFlatlistIsReloading, setIsFlatlistIsReloading] = useState<boolean>(false)
	const [progress, setProgress] = useState<number | undefined>(undefined)

	const [deviceSelected, setDeviceSelected] = useState<RyzenDeviceChipsOptions>('all')
	const [itemDevice, setItemDevice] = useState<RyzenDeviceChipsOptions>('all')
	const [chipPressed, setChipPressed] = useState<RyzenTierChipsOptions>('all')

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)
	const closeSheet = () => bottomSheetRef.current?.close()

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			setProgress(progress === 100 ? undefined : progress)
		}
	}

	const getAsyncData = async () => {
		const device = await AsyncStorage.getItem('chipPressed') as RyzenDeviceChipsOptions
		const itemDevice = await AsyncStorage.getItem("sectionDevice") as RyzenDeviceChipsOptions

		setDeviceSelected(device)
		setItemDevice(itemDevice)
	}

	const sourceData = async () => {
		try {
			if (deviceSelected === 'all' && itemDevice === "all") {
				openSheet()
			}
			else {
				console.log("amdSeries: ", amdSeries)
				console.log("Device: ", itemDevice)
				const successMsg = await scrapeRyzen({
					isLaptop: deviceSelected === "all" ?
						itemDevice === 'laptop' ? AmdDevice.Laptop : AmdDevice.Desktop :
						deviceSelected === 'laptop' ? AmdDevice.Laptop : AmdDevice.Desktop,
					series: amdSeries > 5 ? amdSeries - 5 : amdSeries
				})
				await syncRyzenInventory()
				showSnackbar({
					message: successMsg
				})
			}
		}
		catch (error: any) {
			showSnackbar({
				message: error.errMsg || error.errTitle || "Unknown Error!",
				isError: true
			})
		}
	}

	useEffect(() => {
		getAsyncData()
	}, [])

	useEffect(() => {
		if (amdSeries !== undefined) {
			navigation.setOptions({
				title: RyzenSeriesNameEnum[amdSeries],
				headerLeft: () => <HeaderBackArrow />,
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
		}
	}, [amdSeries, chipPressed, ryzenInventory, deviceSelected])


	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<SelectDeviceOptions device={itemDevice} setDevice={setItemDevice} onPress={sourceData} closeSheet={closeSheet} />}
		>
			<Body progress={progress} >
				<ChipView>
					<ChipCustom chipText="All" selected={chipPressed === 'all'} onPress={() => {
						setChipPressed('all')
					}} />
					<ChipCustom chipText="Ryzen 9" selected={chipPressed === '9'} onPress={() => {
						setChipPressed('9')
					}}
					/>
					<ChipCustom chipText="Ryzen 7" selected={chipPressed === '7'} onPress={() => {
						setChipPressed('7')
					}}
					/>
					<ChipCustom chipText="Ryzen 5" selected={chipPressed === '5'} onPress={() => {
						setChipPressed('5')
					}}
					/>
					<ChipCustom chipText="Ryzen 3" selected={chipPressed === '3'} onPress={() => {
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
								setIsFlatlistIsReloading(true)
								await syncRyzenInventory()
								setIsFlatlistIsReloading(false)
							}}
						/>
					}
					renderItem={({ item, index }) => (
						<Animated.View entering={FadeInDown.duration(500).delay(100 * (index + 1))} key={item.name}>
							{ index !== 0 && <Divider bold /> }
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
						</Animated.View>
					)}
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