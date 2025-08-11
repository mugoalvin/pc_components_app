import ButtonCustom from "@/app/components/buttons/buttonCust";
import AppText from "@/app/components/texts/appText";
import { syncRyzenInventory } from "@/app/index";
import { scrapeRyzen } from "@/app/services/scrape";
import useSnackbarContext from "@/context/SnackbarContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, useState } from "react";
import { FlatList, Pressable, useColorScheme, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";
import { AmdDevice, RyzenSeriesNameArray } from "../../../../packages/types";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";

interface RyzenScrapeOptionsProps {
	sheetRef?: RefObject<BottomSheetMethods | null>
	setIsScrapingInProgress?: (state: boolean) => void
}

export default function RyzenScrapeOptions({ sheetRef, setIsScrapingInProgress }: RyzenScrapeOptionsProps) {
	const theme = useTheme();
	const colorScheme = useColorScheme();
	const { showSnackbar } = useSnackbarContext()

	const [selectedDevice, setSelectedDevice] = useState<"laptop" | "desktop">("desktop")
	const [selectedSeries, setSelectedSeries] = useState<string>("Ryzen 9000 Series")

	const desktopSeries = RyzenSeriesNameArray.slice(0, 5)
	const laptopSeries = RyzenSeriesNameArray.slice(5, -1)

	const selectedOptions = selectedDevice === 'desktop' ? desktopSeries : laptopSeries

	return (
		<>
			<BottomSheetHeader headerText="Scrape Options" />

			<BottomSheetSection
				headerText="Select Device"
				BodyComponent={
					<BottomSheetCard className="p-3 rounded-xl">
						<RadioButton.Group value={selectedDevice} onValueChange={newSelectedDevice => setSelectedDevice(newSelectedDevice as "laptop" | "desktop")}>
							<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSelectedDevice("desktop")} android_ripple={{ color: theme.colors.primary }}>
								<AppText className="text-xl">Desktop</AppText>
								<RadioButton.IOS value="desktop" />
							</Pressable>
							<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSelectedDevice("laptop")} android_ripple={{ color: theme.colors.primary }}>
								<AppText className="text-xl">Laptop</AppText>
								<RadioButton.IOS value="laptop" />
							</Pressable>
						</RadioButton.Group>
					</BottomSheetCard>
				}
			/>

			<BottomSheetSection
				headerText="Select Series"
				BodyComponent={
					<BottomSheetCard className="p-3 rounded-xl">
						<RadioButton.Group value={selectedSeries?.toString() || ''} onValueChange={serie => setSelectedSeries(serie)}>
							<FlatList
								data={selectedOptions}
								renderItem={({ item }) => (
									<Pressable className="flex-row items-center justify-between p-2" onPress={() => setSelectedSeries(item)} android_ripple={{ color: theme.colors.primary }}>
										<AppText className="text-xl">{item}</AppText>
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
				onPress={async () => {
					setIsScrapingInProgress && setIsScrapingInProgress(true)
					try {
						sheetRef?.current?.close();
						showSnackbar({
							message: "Scraping Started... \nProcessing",
						})
						const serverResponse = await scrapeRyzen({
							isLaptop: selectedDevice === 'laptop' ? AmdDevice.Laptop : AmdDevice.Desktop,
							series: selectedDevice === 'desktop' ?
								RyzenSeriesNameArray.indexOf(selectedSeries) :
								RyzenSeriesNameArray.lastIndexOf(selectedSeries) - 5
						})
						await syncRyzenInventory();
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
					finally {
						setIsScrapingInProgress && setIsScrapingInProgress(false)
					}
				}}
			/>
		</>
	)
}