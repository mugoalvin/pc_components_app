import useSnackbarContext from "@/context/SnackbarContext";
import { useWebSocket } from "@/context/WebsockerContext";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { RadeonSeriesEnum } from "../../../packages/types";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import { scrapeRadeon } from "../services/scrape";


export default function ProgressClient() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const { socket } = useWebSocket()
	const [progress, setProgress] = useState<number | undefined>(undefined)

	useEffect(() => {
		navigation.setOptions({
			title: "Test Page",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	if (socket) {
		socket.onmessage = (event: MessageEvent) => {
			const { progress } = JSON.parse(event.data)
			setProgress(progress === 100 ? undefined : progress)
		}
	}

	return (
		<Body className="items-center justify-center gap-4" progress={progress}>

			<AppText className="text-5xl">{theme.colors.background}</AppText>

			<ButtonCustom
				btnText="Scrape Radeon RX GPUs"
				className="w-1/2"
				onPress={() =>
					scrapeRadeon({
						series: RadeonSeriesEnum.Series9000
					}).then(resMsg => {
						showSnackbar({
							message: resMsg
						})
					}).catch(error =>
						showSnackbar({
							message: error.errMsg || error.errTitle || "Unknown Error Occured",
							isError: true
						})
					)
				}
			/>
		</Body>
	);
}
