import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import CustomSectionList from "@/app/components/view/sectionList";
import { syncIntelCoreInventory } from "@/app/index";
import useSnackbarContext from "@/context/SnackbarContext";
import { getSectionedCoreData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { CoreDeviceChipsOptions, ProductBrandFilter } from "@/utils/types";
import useIntelCoreStore from "@/zustand/intel/core";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { IntelGenerationEnum } from "../../../../packages/types";

export default function CoreLine() {
	const navigation = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand, line } = params
	const { showSnackbar } = useSnackbarContext()

	const [chipPressed, setChipPressed] = useState<CoreDeviceChipsOptions>('all')
	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const coreInventory = useIntelCoreStore(state => state.intel_core_inventory)

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Core",
			headerLeft: () => <HeaderBackArrow />,
		})

		syncIntelCoreInventory()
	}, [])

	return (
		<Body>
			<ChipView>
				<ChipCustom
					selected={chipPressed === 'all'}
					chipText="All"
					onPress={() => {
						setChipPressed("all")
					}}
				/>
				<ChipCustom
					selected={chipPressed === 'embedded'}
					chipText="Embedded"
					onPress={() => {
						setChipPressed("embedded")
					}}
				/>
				<ChipCustom
					selected={chipPressed === 'desktop'}
					chipText="Desktop"
					onPress={() => {
						setChipPressed("desktop")
					}}
				/>
				<ChipCustom
					selected={chipPressed === 'mobile'}
					chipText="Mobile"
					onPress={() => {
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
						showSnackbar({
							message: error.errorMsg || error.message || "Refresh error",
							isError: true
						})
					}
					finally {
						setIsPageRefreshing(false)
					}
				}}
			/>
		</Body>
	)
}