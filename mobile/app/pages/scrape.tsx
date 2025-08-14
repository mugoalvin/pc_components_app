import useSnackbarContext from "@/context/SnackbarContext";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import Body from "../components/ui/body";
import { scrapeUltra, scrapeXeon } from "../services/scrape";
import { IntelUltraSeriesEnum, IntelXeonSeries } from "../../../packages/types";

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

			{/* <ButtonCustom
				btnText="Scrape Intel Core Ultra Series 2"
				onPress={async () => {
					const successMsg = await scrapeUltra({
						series: IntelUltraSeriesEnum.Serie2
					})
					showSnackbar({
						message: successMsg
					})
				}}
			/>

			<ButtonCustom
				btnText="Scrape Intel Core Ultra Series 1"
				onPress={async () => {
					const successMsg = await scrapeUltra({
						series: IntelUltraSeriesEnum.Serie1
					})
					showSnackbar({
						message: successMsg
					})
				}}
			/> */}

			<ButtonCustom
				btnText="Run Intel Xeon Scraper"
				onPress={async () => {
					const successMsg = await scrapeXeon({
						series: IntelXeonSeries.E3_v6
					})
					showSnackbar({
						message: successMsg
					})
				}}
			/>

			{/* <ButtonCustom
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
			/> */}

		</Body>
	)
}