import { syncIntelXeonInventory } from "@/app/index"
import ChipCustom from "@/app/components/buttons/chips"
import ProductCard from "@/app/components/cards/productCard"
import HeaderBackArrow from "@/app/components/headerBackArrow"
import Body from "@/app/components/ui/body"
import ChipView from "@/app/components/ui/chipView"
import { ProductBrandFilter, XeonChipsOptions } from "@/utils/types"
import useIntelXeonStore from "@/zustand/intel/xeon"
import { router, useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect, useMemo, useRef, useState } from "react"
import Animated from "react-native-reanimated"
import PageWithBottomSheet from "@/app/components/ui/bottomSheet"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import HeaderRightIcon from "@/app/components/headerRightIcon"
import { useTheme } from "react-native-paper"
import IntelXeonScrapeOptions from "@/app/components/buttomSheet/intelXeonscrapeOptions"
import AppText from "@/app/components/texts/appText"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IntelXeon } from "../../../../packages/interfaces"

export default function XeonProducts() {
	const navigation = useNavigation()
	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['40%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)
	const xeonInventory = useIntelXeonStore(state => state.xeon_inventory)
	const [serie, setSerie] = useState<string>()
	const [xeonToDisplay, setXeonToDisplay] = useState<IntelXeon[]>()
	const [selectedChip, setSelectedChip] = useState<XeonChipsOptions>()
	

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
			headerRight: () => <HeaderRightIcon iconName="cloud-download-outline" onPressFunction={openSheet} />
		})

		getAsync()
		syncIntelXeonInventory()
	}, [])

	useEffect(() => {
		if (serie !== undefined) {
			setXeonToDisplay(
				xeonInventory.filter(xeon =>
					xeon.seriesName === serie &&
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
			<Body>

				<Animated.FlatList
					data={xeonToDisplay}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
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
					)}
				/>
			</Body>
		</PageWithBottomSheet>
	)
}