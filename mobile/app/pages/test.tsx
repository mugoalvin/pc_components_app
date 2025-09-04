import { useWebSocket } from "@/context/WebsockerContext";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import Body from "../components/ui/body";
import useSnackbarContext from "@/context/SnackbarContext";



export default function ProgressClient() {
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const { socket, connectWebSocket } = useWebSocket()

	useEffect(() => {
		navigation.setOptions({
			title: "Test Page",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	function makeCall() {
		if (socket) {
			socket.send("Hello World")

			socket.onmessage = (event: MessageEvent) => {
				showSnackbar({
					message: event.data
				})
			}
		}
		else {
			console.log("Connection not made")
		}
	}

	return (
		<Body className="items-center justify-center gap-4">
			<ButtonCustom
				btnText="Connect Websocket"
				className="w-1/2"
				onPress={connectWebSocket}
			/>
			<ButtonCustom
				btnText="Call Websocket"
				className="w-1/2"
				onPress={makeCall}
			/>
		</Body>
	);
}
