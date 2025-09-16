import IntelXeonScrapeOptions from "@/app/components/buttomSheet/intelXeonscrapeOptions"
import ProductCard from "@/app/components/cards/productCard"
import HeaderBackArrow from "@/app/components/headerBackArrow"
import Body from "@/app/components/ui/body"
import PageWithBottomSheet from "@/app/components/ui/bottomSheet"
import { syncIntelXeonInventory } from "@/app/index"
import { useWebSocket } from "@/context/WebsockerContext"
import { XeonChipsOptions } from "@/utils/types"
import useIntelXeonStore from "@/zustand/intel/xeon"
import { Ionicons } from "@expo/vector-icons"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router, useNavigation } from "expo-router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Divider, useTheme } from "react-native-paper"
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated"

import HeaderRightIconButtons from "@/app/components/headerRightIcon"
import { FlashList } from "@shopify/flash-list"
import { IntelXeon } from "../../../../../packages/interfaces"

export default function XeonProducts() {
	const theme = useTheme()
	const navigation = useNavigation()
	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['40%'], [])
	const { socket } = useWebSocket()
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)
	const xeonInventory = useIntelXeonStore(state => state.xeon_inventory)
	const [serie, setSerie] = useState<string>()
	const [xeonToDisplay, setXeonToDisplay] = useState<IntelXeon[]>()
	const [selectedChip, setSelectedChip] = useState<XeonChipsOptions>()

	const [progress, setProgress] = useState<number | undefined>(undefined)

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			setProgress(progress === 100 ? undefined : progress)
		}
	}
	const getAsync = async () => {
		const serie = await AsyncStorage.getItem("selectedXeonSerie")
		const selectedChip = await AsyncStorage.getItem("selectedChip")
		setSerie(serie!)
		setSelectedChip(selectedChip as XeonChipsOptions)
	}

	useEffect(() => {
		navigation.setOptions({
			title: 'Intel Xeon',
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => <HeaderRightIconButtons buttons={[{
				icon: <Ionicons name='cloud-download-outline' size={16} color={theme.colors.onBackground} />,
				onPress: openSheet
			}]} />
		})

		getAsync()
		syncIntelXeonInventory()
	}, [])

	useEffect(() => {
		if (serie !== undefined) {
			setXeonToDisplay(
				xeonInventory.filter(xeon =>
					xeon.seriesName?.toLowerCase() === serie.toLowerCase() &&
					(selectedChip === "all" ? true : (xeon.vertical_segment)?.toLowerCase().trim() === selectedChip),
				)
			)
		}

	}, [serie, selectedChip])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<IntelXeonScrapeOptions sheetRef={bottomSheetRef} />}
		>
			<Body progress={progress}>
				<FlashList
					data={xeonToDisplay}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<Animated.View
							entering={FadeInLeft.duration(500).delay(100 * (index + 1))}
							exiting={FadeOutRight.duration(500).delay(100 * (index + 1))}
							key={item.name}
						>
							{index !== 0 && <Divider bold />}
							<ProductCard
								key={index}
								title={item.name}
								mainDescription={`${item.total_cores} cores ${item.total_threads} threads`}
								secondaryDescription={`${item.max_turbo_frequency} max turbo frequency`}
								extraInfo={item.recommended_customer_price || item.launch_date}
								onPress={() =>
									router.push({
										pathname: '/pages/product_details',
										params: { processor: JSON.stringify(item) }
									})
								}
							/>
						</Animated.View>
					)}
				/>
			</Body>
		</PageWithBottomSheet>
	)
}