import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import CustomSectionList from "@/app/components/view/sectionList";
import { syncIntelXeonInventory } from "@/app/index";
import useSnackbarContext from "@/context/SnackbarContext";
import { getSectionedXeonData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter, XeonChipsOptions } from "@/utils/types";
import useIntelXeonStore from "@/zustand/intel/xeon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { IntelXeonSeries } from "../../../../../packages/types";

export default function XeonLine() {
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand, line } = params
	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)
	const [selectedChip, setSelectedChip] = useState<XeonChipsOptions>('all')

	const xeonInventory = useIntelXeonStore(state => state.xeon_inventory)

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Xeon",
			headerLeft: () => <HeaderBackArrow />
		})

		syncIntelXeonInventory()
	}, [])

	return (
		<Body>
			<ChipView>
				<ChipCustom
					chipText="All"
					selected={selectedChip === 'all'}
					onPress={() => setSelectedChip('all')}
				/>
				<ChipCustom
					chipText="Embedded"
					selected={selectedChip === 'embedded'}
					onPress={() => setSelectedChip('embedded')}
				/>
				<ChipCustom
					chipText="Server"
					selected={selectedChip === 'server'}
					onPress={() => setSelectedChip('server')}
				/>
			</ChipView>

			<CustomSectionList
				sections={
					getSectionedXeonData(xeonInventory, selectedChip)
				}
				onItemPress={async (item) => {
					await AsyncStorage.setItem("selectedXeonSerie", item.xeonSeries)
					await AsyncStorage.setItem("selectedChip", selectedChip)

					openPage({
						selectedComponent: Number(selectedComponent),
						brand: Number(brand),
						line: Number(line),
						xeonSeries: Number(IntelXeonSeries[item.xeonSeries as keyof typeof IntelXeonSeries])
					})
				}}
				isPageRefreshing={isPageRefreshing}
				onrefresh={async () => {
					try {
						setIsPageRefreshing(true)
						await syncIntelXeonInventory()
						showSnackbar({
							message: "Refresh successful!"
						})
					}
					catch (error: any) {
						console.log(error)
						showSnackbar({
							message: error.message,
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