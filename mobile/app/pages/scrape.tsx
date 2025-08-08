import useSnackbarContext from "@/context/SnackbarContext";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import Body from "../components/ui/body";

export default function ScrapeData() {
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const [inputText, setInputText] = useState<string>()

	useEffect(() => {
		navigation.setOptions({
			title: "Scrape",
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	})

	return (
		<Body>
			<ButtonCustom
				btnText="Show Success Message"
				onPress={() => {
					showSnackbar({
						message: "This is a success message",
					})
				}}
			/>

			<ButtonCustom
				btnText="Show Warning Message"
				onPress={() => {
					showSnackbar({
						message: "This is a warning message",
						isWarning: true
					})
				}}
			/>


			<ButtonCustom
				btnText="Show Error Message"
				onPress={() => {
					showSnackbar({
						message: "This is an error message",
						isError: true
					})
				}}
			/>

		</Body>
	)
}