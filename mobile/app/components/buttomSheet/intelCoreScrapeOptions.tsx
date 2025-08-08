import ButtonCustom from "@/app/components/buttons/buttonCust";
import AppText from "@/app/components/texts/appText";
import { syncIntelCoreInventory } from "@/app/index";
import { scrapeCore } from "@/app/services/scrape";
import useSnackbarContext from "@/context/SnackbarContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject, useState } from "react";
import { useColorScheme, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";
import { IntelGeneration, IntelTierEnum } from "../../../../packages/types";

interface IntelCoreScrapeOptionsProps {
	generation: IntelGeneration
	sheetRef?: RefObject<BottomSheetMethods | null>
}

export default function IntelCoreScrapeOptions({ generation, sheetRef } : IntelCoreScrapeOptionsProps) {
	const theme = useTheme();
	const colorScheme = useColorScheme();
	const { showSnackbar } = useSnackbarContext()

	const [ isi9Checked, setI9Checked ] = useState<boolean>(false);
	const [ isi7Checked, setI7Checked ] = useState<boolean>(false);
	const [ isi5Checked, setI5Checked ] = useState<boolean>(false);
	const [ isi3Checked, setI3Checked ] = useState<boolean>(false);

	const [ selectedCheckBox, setSelectedCheckBox ] = useState<'i9' | 'i7' | 'i5' | 'i3' | undefined>(undefined);

	const falsifyAllCheckBoxes = () => {
		setI9Checked(false)
		setI7Checked(false)
		setI5Checked(false)
		setI3Checked(false)
	}


	return (
		<>
			<AppText bold className="text-4xl mb-3">Scrape Options</AppText>

			<AppText bold className="text-2xl mt-3">Select Tier</AppText>
			<View className="justify-evenly p-3 gap-2 rounded-xl"  style={{ backgroundColor: colorScheme === 'light' ? theme.colors.background : theme.colors.onSecondary }}>
				{
					Number(generation) >= 8 &&
					<View className="flex-row items-center gap-1">
						<RadioButton value="i9" status={isi9Checked ? 'checked' : "unchecked"} onPress={() => {
							falsifyAllCheckBoxes()
							setI9Checked(prev => !prev)
							setSelectedCheckBox('i9')
						} } />
						<AppText className="text-xl">Intel i9</AppText>
					</View>
				}
				<View className="flex-row items-center gap-1">
					<RadioButton value="i7" status={isi7Checked ? 'checked' : "unchecked"} onPress={() => {
						falsifyAllCheckBoxes()
						setI7Checked(prev => !prev)
						setSelectedCheckBox('i7')
					} } />
					<AppText className="text-xl">Intel i7</AppText>
				</View>
				<View className="flex-row items-center gap-1">
					<RadioButton value="i5" status={isi5Checked ? 'checked' : "unchecked"} onPress={() => {
						falsifyAllCheckBoxes()
						setI5Checked(prev => !prev)
						setSelectedCheckBox('i5')
					} } />
					<AppText className="text-xl">Intel i5</AppText>
				</View>
				<View className="flex-row items-center gap-1">
					<RadioButton value="i3" status={isi3Checked ? 'checked' : "unchecked"} onPress={() => {
						falsifyAllCheckBoxes()
						setI3Checked(prev => !prev)
						setSelectedCheckBox('i3')
					} } />
					<AppText className="text-xl">Intel i3</AppText>
				</View>
			</View>

			<ButtonCustom
				btnText="Source From The Web Now"
				className="my-10 h-14"
				disabled={selectedCheckBox === undefined}
				onPress={async () => {
					try {
						sheetRef?.current?.close();
						const res = await scrapeCore({
							generation: Number(generation),
							tier: IntelTierEnum[selectedCheckBox as keyof typeof IntelTierEnum],
						});
						showSnackbar({
							message: typeof res === "string" ? res : "Scrape completed.",
						});
						await syncIntelCoreInventory();
					}
					catch (e: any) {
						showSnackbar({
							message: e.errorMsg || e.message || "Unknown Error",
							isError: true
						});
					}
				}}
			/>
		</>
	)
}