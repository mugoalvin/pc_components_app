import IntelCoreScrapeOptions from "@/app/components/buttomSheet/intelCoreScrapeOptions";
import ChipCustom from "@/app/components/buttons/chips";
import ProductCard from "@/app/components/cards/productCard";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import ChipView from "@/app/components/ui/chipView";
import EmptySectionList from "@/app/components/view/emptySectionList";
import { syncIntelCoreInventory } from "@/app/index";
import { useWebSocket } from "@/context/WebsockerContext";
import { isIntelGenMatching } from "@/utils/functions";
import { CoreTierChipOptions, ProductBrandFilter } from "@/utils/types";
import useIntelCoreStore from "@/zustand/intel/core";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import { IntelCore } from "../../../../packages/interfaces";
import { IntelGeneration } from "../../../../packages/types";

export default function CoreProducts() {
	const { socket } = useWebSocket()
	const theme = useTheme()
	const navigation = useNavigation();
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { generation } = params

	const [chipPressed, setChipPressed] = useState<CoreTierChipOptions>("all")
	const [progress, setProgress] = useState<number | undefined>(undefined)

	const [isAllSelected, setIsAllSelected] = useState<boolean>(true)
	const [isI9Selected, setIsI9Selected] = useState<boolean>(false)
	const [isI7Selected, setIsI7Selected] = useState<boolean>(false)
	const [isI5Selected, setIsI5Selected] = useState<boolean>(false)
	const [isI3Selected, setIsI3Selected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllSelected(false)
		setIsI9Selected(false)
		setIsI7Selected(false)
		setIsI5Selected(false)
		setIsI3Selected(false)
	}

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['50%', '75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)

	const coreInventory = useIntelCoreStore(state => state.intel_core_inventory)
	const [coreToDisplay, setCoreToDisplay] = useState<IntelCore[]>([])
	const [pageRefreshing, setPageRefreshing] = useState<boolean>(false)

	const pageRefresh = async () => {
		try {
			setPageRefreshing(true)
			await syncIntelCoreInventory()
			setPageRefreshing(false)
		}
		catch (error: any) {
			console.error(error)
		}
	}

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			setProgress(progress === 100 ? undefined : progress)
		}
	}

	useEffect(() => {
		const currentProcessors = coreInventory
			.filter(core => isIntelGenMatching(core.processor_number || '', Number(generation) as IntelGeneration))

		setCoreToDisplay(
			chipPressed === 'all' ?
				currentProcessors :
				currentProcessors
					.filter(core => core.processor_number?.includes(chipPressed))
		)
	}, [coreInventory, generation, chipPressed])

	useEffect(() => {
		navigation.setOptions({
			title: `Intel Core Gen ${generation}`,
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => (
				<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={openSheet}>
					<Ionicons name='cloud-download-outline' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)
		})
	}, [])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<IntelCoreScrapeOptions generation={generation} sheetRef={bottomSheetRef} />}
		>
			<Body>
				<ChipView progress={progress}>
					<ChipCustom
						selected={isAllSelected}
						chipText="All"
						onPress={() => {
							falsifyAllChips()
							setIsAllSelected(true)
							setChipPressed('all')
						}}
					/>
					{
						Number(generation) >= 8 &&
						<ChipCustom
							selected={isI9Selected}
							chipText="Intel i9"
							onPress={() => {
								falsifyAllChips()
								setIsI9Selected(true)
								setChipPressed('i9')
							}}
						/>
					}
					<ChipCustom
						selected={isI7Selected}
						chipText="Intel i7"
						onPress={() => {
							falsifyAllChips()
							setIsI7Selected(true)
							setChipPressed('i7')
						}}
					/>
					<ChipCustom
						selected={isI5Selected}
						chipText="Intel i5"
						onPress={() => {
							falsifyAllChips()
							setIsI5Selected(true)
							setChipPressed('i5')
						}}
					/>
					<ChipCustom
						selected={isI3Selected}
						chipText="Intel i3"
						onPress={() => {
							falsifyAllChips()
							setIsI3Selected(true)
							setChipPressed('i3')
						}}
					/>
				</ChipView>

				<Animated.FlatList
					showsVerticalScrollIndicator={false}
					itemLayoutAnimation={LinearTransition}
					data={coreToDisplay}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item, index }) => (
						<ProductCard
							key={index}
							title={item.name}
							mainDescription={`${item.total_cores} cores ${item.total_threads} threads`}
							secondaryDescription={`${item.max_turbo_frequency} max turbo frequency`}
							extraInfo={item.recommended_customer_price || item.launch_date}
							onPress={() =>
								router.push({
									pathname: './product_details',
									params: { processor: JSON.stringify(item) }
								})
							}
						/>
					)}
					ItemSeparatorComponent={() => <Divider bold />}
					ListEmptyComponent={<EmptySectionList isNotScraped />}
					refreshControl={
						<RefreshControl
							refreshing={pageRefreshing}
							onRefresh={pageRefresh}
						/>
					}
				/>
			</Body>
		</PageWithBottomSheet>
	)
}