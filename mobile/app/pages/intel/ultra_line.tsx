import IntelUltraScrapeOptions from "@/app/components/buttomSheet/intelUltraScrapeOptions";
import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import HeaderRightIconButtons from "@/app/components/headerRightIcon";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import ChipView from "@/app/components/ui/chipView";
import { syncIntelUltraInventory } from "@/app/index";
import { useWebSocket } from "@/context/WebsockerContext";
import { getSectionedUltraData, setAsyncData } from "@/utils/functions";
import { ProductBrandFilter, UltraDeviceChipsOptions } from "@/utils/types";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";

import CustomSectionList from "@/app/components/view/sectionList";
import useSnackbarContext from "@/context/SnackbarContext";
import { openPage } from "@/utils/stackOptions";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { IntelUltraTierArray, IntelUltraTierEnum } from "../../../../packages/types";
import Body from "../../components/ui/body";

export default function UltraLine() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { socket } = useWebSocket()
	const { showSnackbar } = useSnackbarContext()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand, line } = params
	const [progress, setProgress] = useState<number | undefined>(undefined)

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)
	const [chipPressed, setChipPressed] = useState<UltraDeviceChipsOptions>('all')

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['40%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)

	const ultraInventory = useIntelCoreUltraStore(state => state.intel_ultra_inventory) || []

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			setProgress(progress === 100 ? undefined : progress)
		}
	}

	useEffect(() => {
		setAsyncData('chipPressed', chipPressed)
	}, [chipPressed])

	useEffect(() => {
		navigation.setOptions({
			title: "Ultra",
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => <HeaderRightIconButtons buttons={[{
				icon: <Ionicons name='cloud-download-outline' size={16} color={theme.colors.onBackground} />,
				onPress: openSheet
			}]} />
		})
	}, [navigation])

	useEffect(() => {
		syncIntelUltraInventory()
	}, [])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<IntelUltraScrapeOptions sheetRef={bottomSheetRef} />}
		>
			<Body progress={progress} >
				<ChipView>
					<ChipCustom
						chipText="All"
						selected={chipPressed === 'all'}
						onPress={() => {
							setChipPressed('all')
						}}
					/>
					<ChipCustom
						chipText="Desktop"
						selected={chipPressed === 'desktop'}
						onPress={() => {
							setChipPressed('desktop')
						}}
					/>
					<ChipCustom
						chipText="Mobile"
						selected={chipPressed === 'mobile'}
						onPress={() => {
							setChipPressed('mobile')
						}}
					/>
					<ChipCustom
						chipText="Embedded"
						selected={chipPressed === 'embedded'}
						onPress={() => {
							setChipPressed('embedded')
						}}
					/>
				</ChipView>


				<CustomSectionList
					sections={
						getSectionedUltraData(
							chipPressed === 'all' ?
								ultraInventory :
								ultraInventory.filter(ultra => (ultra.vertical_segment)?.toLowerCase() === chipPressed),
							chipPressed
						)
					}
					isPageRefreshing={isPageRefreshing}
					onrefresh={async () => {
						setIsPageRefreshing(true)
						await syncIntelUltraInventory()
						setIsPageRefreshing(false)
					}}
					onItemPress={(item, index) => openPage({
						selectedComponent: Number(selectedComponent),
						brand: Number(brand),
						line: Number(line),
						ultraSeries: item.name,
						ultraTier: Number(IntelUltraTierEnum[IntelUltraTierArray[index] as keyof typeof IntelUltraTierEnum])
					})}
				/>

			</Body>
		</PageWithBottomSheet>
	)
}