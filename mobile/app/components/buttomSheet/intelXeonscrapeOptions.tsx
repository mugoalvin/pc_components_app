import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, useState } from "react";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import ButtonCustom from "../buttons/buttonCust";
import { IntelXeonSeries, IntelXeonSeriesArray, IntelXeonSeriesType } from "../../../../packages/types";
import useSnackbarContext from "@/context/SnackbarContext";
import { scrapeXeon } from "@/app/services/scrape";
import { syncIntelXeonInventory } from "@/app/index";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";
import { RadioButton, useTheme } from "react-native-paper";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";
import AppText from "../texts/appText";
import Row from "../row";

interface IntelXeonScrapeOptionsProps {
	sheetRef?: RefObject<BottomSheetMethods | null>
}

export default function IntelXeonScrapeOptions({ sheetRef }: IntelXeonScrapeOptionsProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	const { showSnackbar } = useSnackbarContext()
	const [selectedSeries, setSelectedSeries] = useState<IntelXeonSeriesType | undefined>(undefined)

	return (
		<>
			<BottomSheetHeader headerText="Select Series" />

			<BottomSheetSection
				BodyComponent={
					<BottomSheetCard className="p-3 rounded-xl">
						<Row gap={2}>
							<View className="w-1/2" style={{ backgroundColor: colorScheme === 'light' ? theme.colors.inverseOnSurface : theme.colors.onSecondary }}>
								<RadioButton.Group value={selectedSeries!} onValueChange={series => setSelectedSeries(series as IntelXeonSeriesType)}>
									{
										IntelXeonSeriesArray.slice(0, 12).map(serie => (
											<Pressable key={serie.label} className="flex-row items-center justify-between p-2" onPress={() => setSelectedSeries(serie.serie as IntelXeonSeriesType)} android_ripple={{ color: theme.colors.primary }}>
												<AppText className="text-xl">{serie.label}</AppText>
												<RadioButton.IOS value={serie.serie} />
											</Pressable>
										))
									}
								</RadioButton.Group>
							</View>

							<View className="w-1/2" style={{ backgroundColor: colorScheme === 'light' ? theme.colors.inverseOnSurface : theme.colors.onSecondary }}>
								<RadioButton.Group value={selectedSeries!} onValueChange={series => setSelectedSeries(series as IntelXeonSeriesType)}>
									{
										IntelXeonSeriesArray.slice(12).map(serie => (
											<Pressable key={serie.label} className="flex-row items-center justify-between p-2" onPress={() => setSelectedSeries(serie.serie as IntelXeonSeriesType)} android_ripple={{ color: theme.colors.primary }}>
												<AppText className="text-xl">{serie.label}</AppText>
												<RadioButton.IOS value={serie.serie} />
											</Pressable>
										))
									}
								</RadioButton.Group>
							</View>
						</Row>
					</BottomSheetCard>
				}
			/>

			<ButtonCustom
				btnText="Source From The Web"
				className="mb-5"
				disabled={selectedSeries === undefined}
				onPress={async () => {
					try {
						sheetRef?.current?.close()
						const serverResponse = await scrapeXeon({
							series: IntelXeonSeries[selectedSeries as IntelXeonSeriesType],
							seriesName: selectedSeries!
						})
						await syncIntelXeonInventory()
						showSnackbar({
							message: serverResponse
						})
					} catch (error: any) {
						showSnackbar({
							message: error.errMsg || error.errTitle || error.message || "Scraping Error",
							isError: true
						})
					}
				}}
			/>
		</>
	)
}