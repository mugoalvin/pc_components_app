import useThemeContext from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Appearance, Pressable, useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

import AppText from "../texts/appText";

export default function ThemeChooser() {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	const [selectedColor, setSelectedColor] = useState<string>("")
	const { resetTheme, updateTheme } = useThemeContext()
	const colorHightlightOptions: {colorName: string, hex: string}[] = [
		{colorName:"Blue", hex: "#007cff"},
		{colorName:"Indigo", hex: "#5854d4"},
		{colorName:"Violet", hex: "#bd5bf2"},
		{colorName:"Radical Red", hex: "#fd3660"},
		{colorName:"Red", hex: "#fe4337"},
		{colorName:"Orange", hex: "#fd9e0d"},
		{colorName:"Yellow", hex: "#ffd30a"},
		{colorName:"Green", hex: "#31cf55"}
	]

	return (
		<>
			<AppText className="text-4xl mb-3" bold>App Appearance</AppText>

			<AppText bold className="text-2xl mt-3">Theme</AppText>
			<View className="flex-row h-52 items-center justify-evenly rounded-xl"  style={{ backgroundColor: colorScheme === 'light' ? theme.colors.background : theme.colors.onSecondary }}>
				<Pressable className="h-5/6 w-3/12 items-center justify-end"
					onPress={() => {
						Appearance.setColorScheme("light")
					}}
				>
					<View className="h-4/5 w-full rounded-xl" style={{ backgroundColor: theme.colors.surfaceDisabled }}></View>
					<AppText className="text-2xl">Light</AppText>
				</Pressable>
				<Pressable className="h-5/6 w-3/12 items-center justify-end"
					onPress={() => {
						Appearance.setColorScheme("dark")
					}}
				>
					<View className="h-4/5 w-full rounded-xl" style={{ backgroundColor: theme.colors.surfaceDisabled }}></View>
					<AppText className="text-2xl">Dark</AppText>
				</Pressable>
				<Pressable className="h-5/6 w-3/12 items-center justify-end"
					onPress={() => {
						// console.log("Appearance: ", Appearance.getColorScheme())
						// console.log("Color Scheme: ", colorScheme)
						// Appearance.setColorScheme(Appearance.getColorScheme())
					}}
				>
					<View className="h-4/5 w-full rounded-xl" style={{ backgroundColor: theme.colors.surfaceDisabled }}></View>
					<AppText className="text-2xl">System</AppText>
				</Pressable>
			</View>


			<AppText bold className="text-2xl my-3">Highlight Color</AppText>
			<View className="flex-row px-5 py-2 justify-between items-center rounded-xl" style={{ backgroundColor: colorScheme === 'light' ? theme.colors.background : theme.colors.onSecondary }}>
				{
					colorHightlightOptions.map(colorObj => (
						<View className="items-center gap-1" key={colorObj.colorName}>
							<Pressable className={`${selectedColor === colorObj.hex ? "h-10" : "h-8"} aspect-square rounded-full items-center justify-center`} style={{ backgroundColor: colorObj.hex }} onPress={() => { setSelectedColor(colorObj.hex); updateTheme(colorObj.hex) }}>
								{
									selectedColor === colorObj.hex &&
									<Ionicons name="checkmark" size={20} />
								}
							</Pressable>
							{
								selectedColor === colorObj.hex &&
									<AppText>{colorObj.colorName}</AppText>
							}
						</View>
					))
				}
				<View  className="items-center gap-1">
					<Pressable key="reset" className={`${selectedColor === "" ? "h-10" : "h-8"} aspect-square rounded-full items-center justify-center`} style={{ backgroundColor: "#fff" }} onPress={() => { setSelectedColor(""); resetTheme() }}>
						<Ionicons name="refresh" size={20} />
					</Pressable>
					{
						selectedColor === "" &&
							<AppText>Reset</AppText>
					}
				</View>
			</View>
		</>
	)
}