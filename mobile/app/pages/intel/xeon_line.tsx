import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import CustomSectionList from "@/app/components/view/sectionList";
import { getSectionedXeonData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter } from "@/utils/types";
import useIntelXeonStore from "@/zustand/intel/xeon";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { IntelXeonSeries } from "../../../../packages/types";
import { syncIntelXeonInventory } from "@/app/index";
import useSnackbarContext from "@/context/SnackbarContext";

export default function XeonLine() {
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	// @ts-expect-error
	const { selectedComponent, brand, line } = params


	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const xeonInventory = useIntelXeonStore(state => state.xeon_inventory)

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Xeon",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	return (
		<Body>
			<ChipView>
				<ChipCustom chipText="All" selected />
				<ChipCustom chipText="Embedded" />
				<ChipCustom chipText="Server" />
			</ChipView>

			<CustomSectionList
				sections={
					getSectionedXeonData(xeonInventory)
				}
				onItemPress={(item) => openPage({
					selectedComponent: Number(selectedComponent),
					brand: Number(brand),
					line: Number(line),
					xeonSeries: Number(IntelXeonSeries[item.xeonSeries as keyof typeof IntelXeonSeries])
				})}
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