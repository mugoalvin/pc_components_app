import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import CustomSectionList from "@/app/components/view/sectionList";
import { syncIntelCoreInventory } from "@/app/index";
import { getSectionedCoreData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { CoreDeviceChipsOptions, ProductBrandFilter } from "@/utils/types";
import useIntelCoreStore from "@/zustand/intel/core";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";
import { IntelGenerationEnum } from "../../../../packages/types";
import useSnackbarContext from "@/context/SnackbarContext";

export default function CoreLine() {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	const navigation = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	// @ts-expect-error
	const { selectedComponent, brand, line } = params
	const { showSnackbar } = useSnackbarContext()

	const [chipPressed, setChipPressed] = useState<CoreDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllSelected] = useState<boolean>(true)
	const [isEmbeddedSelected, setIsEmbeddedSelected] = useState<boolean>(false)
	const [isDesktopSelected, setIsDesktopSelected] = useState<boolean>(false)
	const [isMobileSelected, setIsMobileSelected] = useState<boolean>(false)

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllSelected(false)
		setIsEmbeddedSelected(false)
		setIsDesktopSelected(false)
		setIsMobileSelected(false)
	}

	const coreInventory = useIntelCoreStore(state => state.intel_core_inventory)

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Core",
			headerLeft: () => <HeaderBackArrow />,
		})

		syncIntelCoreInventory()
	})

	return (
		<Body>
			<ChipView>
				<ChipCustom
					selected={isAllSelected}
					chipText="All"
					onPress={() => {
						falsifyAllChips()
						setIsAllSelected(true)
						setChipPressed("all")
					}}
				/>
				<ChipCustom
					selected={isEmbeddedSelected}
					chipText="Embedded"
					onPress={() => {
						falsifyAllChips()
						setIsEmbeddedSelected(true)
						setChipPressed("embedded")
					}}
				/>
				<ChipCustom
					selected={isDesktopSelected}
					chipText="Desktop"
					onPress={() => {
						falsifyAllChips()
						setIsDesktopSelected(true)
						setChipPressed("desktop")
					}}
				/>
				<ChipCustom
					selected={isMobileSelected}
					chipText="Mobile"
					onPress={() => {
						falsifyAllChips()
						setIsMobileSelected(true)
						setChipPressed("mobile")
					}}
				/>
			</ChipView>


			<CustomSectionList
				sections={
					getSectionedCoreData(
						chipPressed === 'all' ?
							coreInventory :
							coreInventory.filter(core => core.vertical_segment?.trim().toLowerCase() === chipPressed),
						chipPressed
					)
				}
				isPageRefreshing={isPageRefreshing}
				onItemPress={(item) => openPage({
					selectedComponent: Number(selectedComponent),
					brand: Number(brand),
					line: Number(line),
					generation: Number(IntelGenerationEnum[item.generation as keyof typeof IntelGenerationEnum])
				})}
				onrefresh={async () => {
					try {
						setIsPageRefreshing(true)
						await syncIntelCoreInventory()
					}
					catch (error: any) {
						console.log(error)
					}
					finally {
						setIsPageRefreshing(false)
					}
				}}
			/>
		</Body>
	)
}