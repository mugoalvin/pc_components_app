import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import Body from "../components/ui/body";
import AppText from "../components/texts/appText";
import ButtonCustom from "../components/buttons/buttonCust";
import { useNavigation } from "expo-router";
import HeaderBackArrow from "../components/headerBackArrow";
import { ProgressBar, useTheme } from "react-native-paper";
import axios from "axios";
import Constants from "expo-constants";
import useSnackbarContext from "@/context/SnackbarContext";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''
const webSocketDomain = Constants.expoConfig?.extra?.WEB_SOCKET_API_DOMAIN ?? ''


export default function ProgressClient() {
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const [progress, setProgress] = useState<(number)>(0);
	const [taskStatus, setTaskStatus] = useState<string>("Not started");
	const [ws, setWs] = useState<WebSocket | null>(null);

	const startJob = async () => {
		try {
			const serverDomain: string = (await axios.get(`${apiDomain}/websocket/start`)).data
			const webSocketDomain = serverDomain.replace('http', 'ws')

			const socket = new WebSocket(webSocketDomain)

			socket.onopen = () => {
				socket.send("Hello World")
			}

			socket.onmessage = (event: MessageEvent) => {
				setProgress(event.data)
			}


			socket.onerror = (err: Event) => {
				console.error(err)
				showSnackbar({
					message: "WebSocket error: "
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
