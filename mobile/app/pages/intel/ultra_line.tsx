import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import ChipView from "@/app/components/ui/chipView";
import CustomSectionList from "@/app/components/view/sectionList";
import { syncIntelUltraInventory } from "@/app/index";
import { getSectionedUltraData, setAsyncData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter, UltraDeviceChipsOptions } from "@/utils/types";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";
import { IntelUltraTierArray, IntelUltraTierEnum } from "../../../../packages/types";
import Body from "../../components/ui/body";

export default function UltraLine() {
	const theme = useTheme()
	const navigation = useNavigation()
	const colorScheme = useColorScheme()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	// @ts-expect-error
	const { selectedComponent, brand, line } = params

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const [chipPressed, setChipPressed] = useState<UltraDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopChipSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isMobileChipSelected, setIsMobileChipSelected] = useState<boolean>(false)
	const [isEmbeddedChipSelected, setIsEmbeddedChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsMobileChipSelected(false)
		setIsEmbeddedChipSelected(false)
	}

	const ultraInventory = useIntelCoreUltraStore(state => state.intel_ultra_inventory) || []

	useEffect(() => {
		setAsyncData('chipPressed', chipPressed)
	}, [chipPressed])

	useEffect(() => {
		navigation.setOptions({
			title: "Ultra",
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	}, [navigation])

	useEffect(() => {
		syncIntelUltraInventory()
	})

	return (
		<Body>
			<ChipView>
				<ChipCustom
					chipText="All"
					selected={isAllSelected}
					onPress={() => {
						falsifyAllChips()
						setIsAllChipSelected(prev => !prev)
						setChipPressed('all')
					}}
				/>
				<ChipCustom
					chipText="Desktop"
					selected={isDesktopChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsDesktopChipSelected(prev => !prev)
						setChipPressed('desktop')
					}}
				/>
				<ChipCustom
					chipText="Mobile"
					selected={isMobileChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsMobileChipSelected(prev => !prev)
						setChipPressed('mobile')
					}}
				/>
				<ChipCustom
					chipText="Embedded"
					selected={isEmbeddedChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsEmbeddedChipSelected(prev => !prev)
						setChipPressed('embedded')
					}}
				/>
			</ChipView>


			<CustomSectionList
				sections={
					getSectionedUltraData(
						chipPressed === 'all' ?
							ultraInventory :
							ultraInventory.filter(ultra => (ultra.vertical_segment)?.toLowerCase() === chipPressed)
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
	)
}