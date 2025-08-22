import { Image, ImageBackground } from "expo-image";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Body from "./body";
import AppText from "../texts/appText";

export default function CustomSplashScreen(){
	const theme = useTheme()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	return(
		<Body className="items-center justify-center">
			<View
				className="w-52 aspect-square items-center justify-center"
			>
				<Image
					// source='/assets/images/amd_logo.png'
					source='https://img.icons8.com/?size=50&id=RKoVHgQbQEQB&format=png'
					contentFit="fill"
					tintColor={theme.colors.elevation.level5}
					className="flex-1"
				/>
			</View>
			<AppText>Image Above</AppText>
		</Body>
	)
}