import RadeonScrapeOptions from "@/app/components/buttomSheet/radeonScrapeOptions";
import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import HeaderRightIconButtons from "@/app/components/headerRightIcon";
import Body from "@/app/components/ui/body";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import ChipView from "@/app/components/ui/chipView";
import { syncRadeonInventory } from "@/app/index";
import useSnackbarContext from "@/context/SnackbarContext";
import { useWebSocket } from "@/context/WebsockerContext";
import { ProductBrandFilter } from "@/utils/types";
import useRadeonStore from "@/zustand/amd/radeon";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { Radeon } from "../../../../../packages/interfaces";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import ProductCard from "@/app/components/cards/productCard";

export default function RadeonRXProducts() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { socket } = useWebSocket()
	const { showSnackbar } = useSnackbarContext()
	const [scrapeProgress, setScrapeProgress] = useState<number | undefined>(undefined)
	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)
	const [radeonToDisplay, setRadeonToDisplay] = useState<Radeon[]>([])
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand } = params

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['40%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(1)

	const radeonInventory: Radeon[] = useRadeonStore(state => state.radeon_inventory)

	const syncRadeon = async () => {
		try {
			await syncRadeonInventory()
		}
		catch (err: any) {
			showSnackbar({
				message: err.message,
				isError: true
			})
		}
	}

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			if (progress === 100) {
				setScrapeProgress(100)
				setTimeout(() => setScrapeProgress(undefined), 1500)
			} else {
				setScrapeProgress(progress)
			}
		}
	}

	useEffect(() => {
		navigation.setOptions({
			title: 'AMD Radeon',
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => <HeaderRightIconButtons
				buttons={[{
					icon: <Ionicons name='cloud-download-outline' size={16} color={theme.colors.onBackground} />,
					onPress: openSheet
				}]}
			/>
		})
	}, [navigation])

	useEffect(() => {
		syncRadeon()
	}, [])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			initialSnapIndex={-1}
			snapPoints={snapPoints}
			sheetContent={<RadeonScrapeOptions />}
		>
			<Body progress={scrapeProgress}>
				<ChipView>
					<ChipCustom chipText="All" />
					<ChipCustom chipText="9000 Series" />
					<ChipCustom chipText="7000 Series" />
					<ChipCustom chipText="6000 Series" />
				</ChipView>

				<FlashList
					data={radeonInventory}
					renderItem={({ item, index }) => (
						<Animated.View entering={FadeInDown.duration(500).delay(100 * (index + 1))} key={item.name}>
							{index !== 0 && <Divider bold />}
							<ProductCard
								key={index}
								title={item.name}
								mainDescription={`${item.max_memory_size} ${item.memory_type}`}
								secondaryDescription={`${item.memory_speed?.replace("Up to ", '')} speed.`}
								extraInfo={item.launch_date}
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