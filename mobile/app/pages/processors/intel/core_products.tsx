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
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { IntelCore } from "../../../../../packages/interfaces";
import { IntelGeneration } from "../../../../../packages/types";
import HeaderRightIconButtons from "@/app/components/headerRightIcon";

export default function CoreProducts() {
	const { socket } = useWebSocket()
	const theme = useTheme()
	const navigation = useNavigation();
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { generation } = params

	const [chipPressed, setChipPressed] = useState<CoreTierChipOptions>("all")
	const [progress, setProgress] = useState<number | undefined>(undefined)

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
			(chipPressed === 'all' ?
				currentProcessors :
				currentProcessors
					.filter(core => core.processor_number?.includes(chipPressed)))
				.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''))
		)
	}, [coreInventory, generation, chipPressed])

	useEffect(() => {
		navigation.setOptions({
			title: `Intel Core Gen ${generation}`,
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => <HeaderRightIconButtons buttons={[{
				icon: <Ionicons name='cloud-download-outline' size={16} color={theme.colors.onBackground} />,
				onPress: openSheet
			}]}/>
		})
	}, [])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<IntelCoreScrapeOptions generation={generation} sheetRef={bottomSheetRef} />}
		>
			<Body progress={progress}>
				<ChipView>
					<ChipCustom
						selected={chipPressed === 'all'}
						chipText="All"
						onPress={() => {
							setChipPressed('all')
						}}
					/>
					{
						Number(generation) >= 8 &&
						<ChipCustom
							selected={chipPressed === 'i9'}
							chipText="Intel i9"
							onPress={() => {
								setChipPressed('i9')
							}}
						/>
					}
					<ChipCustom
						selected={chipPressed === 'i7'}
						chipText="Intel i7"
						onPress={() => {
							setChipPressed('i7')
						}}
					/>
					<ChipCustom
						selected={chipPressed === 'i5'}
						chipText="Intel i5"
						onPress={() => {
							setChipPressed('i5')
						}}
					/>
					<ChipCustom
						selected={chipPressed === 'i3'}
						chipText="Intel i3"
						onPress={() => {
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
						<Animated.View entering={FadeInDown.duration(500).delay(100 * (index + 1))} key={item.name}>
							{ index !== 0 && <Divider bold /> }
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
						</Animated.View>
					)}
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