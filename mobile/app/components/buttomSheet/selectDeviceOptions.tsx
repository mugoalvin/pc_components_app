import RadioButtonGroup from "react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup";
import AppText from "../texts/appText";
import BottomSheetHeader from "../texts/bottomSheetHeader";
import BottomSheetSection from "../ui/bottomSheet/bottomSheetSection";
import { RadioButton, useTheme } from "react-native-paper";
import { useState } from "react";
import { RyzenDeviceChipsOptions } from "@/utils/types";
import { Pressable } from "react-native";
import BottomSheetCard from "../ui/bottomSheet/bottomSheetCard";
import useThemeContext from "@/context/ThemeContext";
import ButtonCustom from "../buttons/buttonCust";

interface SelectDeviceOptionsProps {
	device: RyzenDeviceChipsOptions
	setDevice: (newDevice: RyzenDeviceChipsOptions) => void
	closeSheet?: () => void
	onPress?: () => void
}
export default function SelectDeviceOptions({ device, setDevice, closeSheet, onPress }: SelectDeviceOptionsProps) {
	const theme = useTheme()

	return (
		<>
			<BottomSheetHeader headerText="Select Device" />

			<BottomSheetSection
				className={ device.toString() }
				BodyComponent={
					<>
						<BottomSheetCard className="p-3 rounded-xl">
							<RadioButton.Group value={device} onValueChange={newDevice => setDevice(newDevice as RyzenDeviceChipsOptions)}>
								<Pressable className="flex-row items-center justify-between p-2" onPress={() => setDevice("desktop")} android_ripple={{ color: theme.colors.primary }}>
									<AppText className="text-xl">Desktop</AppText>
									<RadioButton.IOS value="desktop" />
								</Pressable>
								<Pressable className="flex-row items-center justify-between p-2" onPress={() => setDevice("laptop")} android_ripple={{ color: theme.colors.primary }}>
									<AppText className="text-xl">Laptop</AppText>
									<RadioButton.IOS value="laptop" />
								</Pressable>
							</RadioButton.Group>
						</BottomSheetCard>

						<ButtonCustom
							disabled={ device === 'all' }
							btnText="Source"
							onPress={() => {
								closeSheet && closeSheet()
								onPress && onPress()
							}}
						/>
					</>
				}
			/>
		</>
	)
}