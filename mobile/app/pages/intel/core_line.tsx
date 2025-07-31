import ChipCustom from "@/app/components/buttons/chips";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import AppText from "@/app/components/texts/appText";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Menu, useTheme } from "react-native-paper";

export default function CoreLine(){
	const theme = useTheme()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Core",
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => (
				<View className="flex-row relative">
					<Menu
						visible={false}
						anchor={
							<TouchableOpacity className='w-10 h-10 items-center justify-center'>
								<Ionicons name='ellipsis-vertical-sharp' size={20} color={theme.colors.onBackground} />
							</TouchableOpacity>
						}
					>
						<Menu.Item
							title={
								<AppText>Scrape Desktop</AppText>
							}
						/>
						<Menu.Item
							title={
								<AppText>Scrape Desktop</AppText>
							}
						/>

					</Menu>
				</View>
			)
		})
	})

	return (
		<Body>
			<ChipView>
				<ChipCustom
					chipText="All"
					selected={true}
				/>
				<ChipCustom
					chipText="Intel i9"
					selected={false}
				/>
				<ChipCustom
					chipText="Intel i7"
					selected={false}
				/>
				<ChipCustom
					chipText="Intel i5"
					selected={false}
				/>
				<ChipCustom
					chipText="Intel i3"
					selected={false}
				/>
			</ChipView>
		</Body>
	)
}