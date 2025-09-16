import useSnackbarContext from "@/context/SnackbarContext";
import { RefObject, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";
import { RadeonRXSeriesArray, RadeonRXSeriesEnum, RadeonRXSeriesStingsArray, RadeonRXSeriesType } from "../../../../packages/types";
import ButtonCustom from "../buttons/buttonCust";
import AppText from "../texts/appText";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { scrapeRadeon } from "@/app/services/scrape";
import { syncRadeonInventory } from "@/app/index";

interface RadeonScrapeOptionsProps {
	sheetRef?: RefObject<BottomSheetMethods | null>
}

export default function RadeonScrapeOptions({ sheetRef }: RadeonScrapeOptionsProps) {
	const theme = useTheme()
	const { showSnackbar } = useSnackbarContext()
	const [series, setSeries] = useState<RadeonRXSeriesType>("Series9000")

	return (
		<>
			<BottomSheetHeader headerText={"Radeon Options"} />
			<BottomSheetSection
				headerText="Header"
				BodyComponent={
					<BottomSheetCard className="p-3 rounded-xl">
						<RadioButton.Group value={series} onValueChange={series => setSeries(series as RadeonRXSeriesType)}>
							<FlatList
								data={RadeonRXSeriesArray}
								renderItem={({ item, index }) => (
									<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSeries(item as RadeonRXSeriesType)} android_ripple={{ color: theme.colors.primary }}>
										<AppText className="text-xl">{RadeonRXSeriesStingsArray[index]}</AppText>
										<RadioButton.IOS value={item} />
									</Pressable>
								)}
							/>
						</RadioButton.Group>
					</BottomSheetCard>
				}

			/>
			<ButtonCustom
				btnText="Source From The Web Now"
				className="my-10 h-14"
				onPress={ async () => {
					try {
						sheetRef?.current?.close()
						showSnackbar({
							message: 'Processing...'
						})
						const serverResponce = await scrapeRadeon({
							series: RadeonRXSeriesEnum[series]
						})

						await syncRadeonInventory()

						showSnackbar({
							message: serverResponce
						})
					} catch (e: any) {
						showSnackbar({
							message: e.errMsg || e.errTitle || e.message || "Unknown Scrape Error Occured",
							isError: true
						})
					}
				}}
			/>
		</>
	)
}