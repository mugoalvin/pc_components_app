import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import HeaderBackArrow from "../components/headerBackArrow";
import Body from "../components/ui/body";


export default function ProgressClient() {
	const theme = useTheme()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Test Page",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	return (
		<Body className="justify-center">
		</Body>
	);
}
