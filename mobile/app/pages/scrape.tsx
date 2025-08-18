import useSnackbarContext from "@/context/SnackbarContext";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import Body from "../components/ui/body";
import { connectDatabase, scrapeUltra, scrapeXeon } from "../services/scrape";
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

			<ButtonCustom
				btnText="Connect database"
				onPress={async () => {
					const successMsg = await connectDatabase()
					showSnackbar({
						message: successMsg
					})
				}}
			/>

		</Body>
	)
}