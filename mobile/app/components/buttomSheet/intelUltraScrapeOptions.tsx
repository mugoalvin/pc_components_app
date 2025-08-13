import { RadioButton, useTheme } from "react-native-paper";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";
import { Pressable } from "react-native";
import AppText from "../texts/appText";
import { RefObject, useState } from "react";
import { UltraDeviceChipsOptions, UltraSeriesChipsOptions } from "@/utils/types";
import ButtonCustom from "../buttons/buttonCust";
import useSnackbarContext from "@/context/SnackbarContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { scrapeUltra } from "@/app/services/scrape";
import { IntelUltraSeriesEnum, IntelUltraTierEnum } from "../../../../packages/types";
import { syncIntelUltraInventory } from "@/app/index";

interface IntelUltraScrapeOptionsProps {
	sheetRef?: RefObject<BottomSheetMethods | null>
}

export default function IntelUltraScrapeOptions({ sheetRef }: IntelUltraScrapeOptionsProps) {
	const theme = useTheme()
	const [series, setSeries] = useState<UltraSeriesChipsOptions>('all')
	const { showSnackbar } = useSnackbarContext()

	return (
		<>
			<BottomSheetHeader headerText="Select Series" />

			<BottomSheetSection
				BodyComponent={
					<>
						<BottomSheetCard className="p-3 rounded-xl">
							<RadioButton.Group value={series} onValueChange={newSeries => setSeries(newSeries as UltraSeriesChipsOptions)}>
								<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSeries("series 1")} android_ripple={{ color: theme.colors.primary }}>
									<AppText className="text-xl">Series 1</AppText>
									<RadioButton.IOS value="series 1" onPress={() => setSeries("series 1")} />
								</Pressable>
								<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSeries("series 2")} android_ripple={{ color: theme.colors.primary }}>
									<AppText className="text-xl">Series 2</AppText>
									<RadioButton.IOS value="series 2" onPress={() => setSeries("series 1")} />
								</Pressable>
							</RadioButton.Group>
						</BottomSheetCard>

						<ButtonCustom
							btnText="Source From The Web Now"
							className="my-10 h-14"
							disabled={series === 'all'}
							onPress={async () => {
								try {
									sheetRef?.current?.close();
									const serverResponse = await scrapeUltra({
										series: series === 'series 1' ? IntelUltraSeriesEnum.Serie1 : IntelUltraSeriesEnum.Serie2
									})
									await syncIntelUltraInventory();
									showSnackbar({
										message: serverResponse,
									})
								}
								catch (e: any) {
									showSnackbar({
										message: e.errMsg || e.errTitle || e.message || "Scraping Error",
										isError: true
									});
								}
							}}
						/>
					</>
				}
			/>

		</>
	)
}