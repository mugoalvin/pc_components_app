import { router } from "expo-router";
import { ToastAndroid, View } from "react-native";
import CoreComponent from "./coreComponent";



export default function ToolsAndUtils(
	{ openSheet }: { openSheet: () => void }
) {
	return (
		<>
			<View className="flex-col gap-2 justify-between">
				<CoreComponent key="scrape" title='Scraper' extra="Source Parts From The Web" iconLib="MaterialIcons" icon='download' full onPress={() => router.push({ pathname: "/pages/scrape" })} />
			</View>
			<View className="flex-row gap-2 justify-between">
				<CoreComponent key="extra" title="An Extra Button" iconLib="MaterialCommunityIcons" icon="test-tube" onPress={() =>
					// ToastAndroid.showWithGravityAndOffset(
					// 	'Unutilized Button!',
					// 	ToastAndroid.LONG,
					// 	ToastAndroid.TOP,
					// 	25,
					// 	50,
					// )
					router.push("/pages/test")
				} />
				<CoreComponent key="settings" title='Settings' iconLib="FontAwesome6" icon='gear' onPress={openSheet} />
			</View>
		</>
	)
}