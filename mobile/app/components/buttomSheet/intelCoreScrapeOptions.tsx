import ButtonCustom from "@/app/components/buttons/buttonCust";
import AppText from "@/app/components/texts/appText";
import { syncIntelCoreInventory } from "@/app/index";
import { scrapeCore } from "@/app/services/scrape";
import useSnackbarContext from "@/context/SnackbarContext";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ordinal from 'ordinal';
import { RefObject, useState } from "react";
import { Pressable } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";
import { IntelGeneration, IntelTierEnum } from "../../../../packages/types";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";

interface IntelCoreScrapeOptionsProps {
	generation: IntelGeneration
	sheetRef?: RefObject<BottomSheetMethods | null>
}

export default function IntelCoreScrapeOptions({ generation, sheetRef }: IntelCoreScrapeOptionsProps) {
	const theme = useTheme();
	const { showSnackbar } = useSnackbarContext()

	const radioBtnTierArray = [
		{
			tier: 'i9',
			tierName: 'Intel i9'
		},
		{
			tier: 'i7',
			tierName: 'Intel i7'
		},
		{
			tier: 'i5',
			tierName: 'Intel i5'
		},
		{
			tier: 'i3',
			tierName: 'Intel i3'
		}
	]
	const [selectedCheckBox, setSelectedCheckBox] = useState<'i9' | 'i7' | 'i5' | 'i3' | undefined>(undefined);


	return (
		<>
			<BottomSheetHeader headerText="Scrape Options" />

			<BottomSheetSection
				headerText={`Select ${ordinal(Number(generation))} generation tier`}
				BodyComponent={
					<BottomSheetCard className="p-3 rounded-xl">
						<RadioButton.Group value={selectedCheckBox!} onValueChange={newValue => setSelectedCheckBox(newValue as 'i9' | 'i7' | 'i5' | 'i3')}>
							{
								radioBtnTierArray.map(tier => (
									<Pressable key={tier.tierName} className="flex-row items-center justify-between p-2" onPress={() => setSelectedCheckBox(tier.tier as 'i9' | 'i7' | 'i5' | 'i3')} android_ripple={{ color: theme.colors.primary }}>
										<AppText className="text-xl">{tier.tierName}</AppText>
										<RadioButton.IOS value={tier.tier} />
									</Pressable>
								))
							}
						</RadioButton.Group>

					</BottomSheetCard>
				}
			/>

			<ButtonCustom
				btnText="Source From The Web"
				className="h-14 mb-10"
				disabled={selectedCheckBox === undefined}
				onPress={async () => {
					try {
						sheetRef?.current?.close();
						const res = await scrapeCore({
							generation: Number(generation),
							tier: IntelTierEnum[selectedCheckBox as keyof typeof IntelTierEnum],
						});
						showSnackbar({
							message: res
						});
						await syncIntelCoreInventory();
					}
					catch (e: any) {
						showSnackbar({
							message: e.errTitle || e.errMsg || e.message || "Unknown Error",
							isError: true
						});
					}
				}}
			/>

		</>
	)
}