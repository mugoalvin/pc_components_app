import { syncRadeonInventory } from "@/app/index";
import useRyzenStore from "@/zustand/amd/ryzen";
import { useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../../texts/appText";

export default function RecommendedForYou() {
	const theme = useTheme()
	const ryzen_inventory = useRyzenStore(state => state.ryzen_inventory)[0]

	useEffect(() => {
		syncRadeonInventory()
	}, [])

	console.log(ryzen_inventory)


	return (
		<View
			className="flex-row p-3 gap-7 rounded-xl"
			style={{
				backgroundColor: theme.colors.elevation.level2,
			}}
		>
			<View className="max-w-50">
				<AppText bold className="text-3xl">{ryzen_inventory.name}</AppText>
				<AppText>{ryzen_inventory.family} - {ryzen_inventory.max_boost_clock}</AppText>
			</View>
			{/* <View className="flex-1 h-36">
				<Image
					// source="https://static.gigabyte.com/StaticFile/Image/Global/8672dbdf9d50a340b83d98d5399729ca/Product/32032/webp/1000"
					source={ryzen_inventory.image}
					style={{ flex: 1, resizeMode: "cover", borderRadius: 10 }}
				/>
			</View> */}
		</View>
	)
}