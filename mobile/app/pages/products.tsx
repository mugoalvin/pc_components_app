import { dummyProcessorsData } from "@/utils/dummyData/brand";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Divider, Menu, useTheme } from "react-native-paper";
import ChipCustom from "../components/buttons/chips";
import ProductCard from "../components/cards/productCard";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import SearchBarCustom from "../components/ui/searchBarCustom";
import { makeApiRequestToScrapeGeforce } from "@/app/services/scrape";

export default function Products() {
	const theme = useTheme()
	const navigation = useNavigation()
	const [ isSearchBtnPressed, setIsSearchBtnPressed ] = useState<boolean>(false)
	const [ isScrapingInProgress, setIsScrapingInProgress ] = useState<boolean>(false)

	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	async function makeApiRequest() {
		setIsScrapingInProgress(prev => !prev)
		closeMenu()
		await makeApiRequestToScrapeGeforce()
			.then(() => {
				setIsScrapingInProgress(prev => !prev)
			})
	}

	useEffect(() => {
		navigation.setOptions({
			title: "Ryzen 9000 Series",
			headerLeft: () => (
				<TouchableOpacity className='w-10 h-10 justify-center' onPress={() => navigation.goBack()} >
					<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View className="flex-row relative">
					<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={() => setIsSearchBtnPressed(prev => !prev)}>
						<Ionicons name={isSearchBtnPressed ? 'close-outline' : 'search-outline'} size={20} color={theme.colors.onBackground} />
					</TouchableOpacity>

					<Menu
						visible={visible}
						onDismiss={closeMenu}
						anchor={
							<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={openMenu}>
								<Ionicons name='ellipsis-vertical-sharp' size={20} color={theme.colors.onBackground} />
							</TouchableOpacity>
						}
						style={{
							marginTop: 50
						}}
					>
						<Menu.Item
							onPress={makeApiRequest}
							title={
								<AppText>Scrape Ryzen 9000 Series</AppText>
							}
						/>
					</Menu>
					{/* <AppText className="flex-nowrap">Products</AppText> */}
				</View>
			)
		})
	})


	return (
		<Body>
				{
					isScrapingInProgress  && (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator />
						</View>
					)
				}
			{isSearchBtnPressed && <SearchBarCustom focused />}
			<View className="flex-row gap-3 flex-wrap">
				<ChipCustom chipText="All" />
				<ChipCustom chipText="i9 Family" />
				<ChipCustom chipText="i7 Family" />
				<ChipCustom chipText="i5 Family" />
				<ChipCustom chipText="i3 Family" />
			</View>

			<FlatList
				data={dummyProcessorsData}
				keyExtractor={(item, index) => item.name + index}
				renderItem={({ item }) => (
					<ProductCard
						key={item.name}
						title={item.name}
						mainDescription={`${item.number_of_performance_cores} cores ${item.total_threads} threads`}
						secondaryDescription={`${item.max_turbo_frequency} boost frequency`}
						extraInfo={item.extra || item.launch_date}
						onPress={() => router.push({
							pathname: "/pages/product_details"
						})}
					/>
				)}
				ItemSeparatorComponent={() => <Divider bold />}
			/>





		</Body>
	)
}