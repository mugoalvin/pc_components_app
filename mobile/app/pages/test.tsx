import useSnackbarContext from "@/context/SnackbarContext";
import { useWebSocket } from "@/context/WebsockerContext";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ProgressBar } from "react-native-paper";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";



export default function ProgressClient() {
	const navigation = useNavigation()
	const { socket } = useWebSocket()
	const { showSnackbar } = useSnackbarContext()
	const [progress, setProgress] = useState<(number)>(0);
	const [taskStatus, setTaskStatus] = useState<string>("Not started");
	const [ws, setWs] = useState<WebSocket | null>(null);

	const startJob = async () => {
		try {
			socket!.send("Hello World")

			socket!.onmessage = (event: MessageEvent) => {
				setProgress(event.data)
			}


			socket!.onerror = (err: Event) => {
				console.error(err)
				showSnackbar({
					message: "WebSocket Error."
				})
			}
		}
		catch (error: any) {
			showSnackbar({
				message: "Error: " + error.message,
				isError: true
			})
		}
	}

	useEffect(() => {
		navigation.setOptions({
			title: "Test Page",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	return (
		<Body className="items-center justify-around pb-80">
			<View className="w-full">
				<AppText bold className="text-2xl">{progress}%</AppText>
				<ProgressBar
					progress={progress / 100}
					className="w-full"
				/>
			</View>
			<View className="flex-row gap-4">
				<ButtonCustom btnText="Websocket Call" className="w-6/12" onPress={startJob} />
				<ButtonCustom btnText="Clear Progress" className="w-6/12" onPress={() => setProgress(0)} />
			</View>
		</Body>
	);
}
