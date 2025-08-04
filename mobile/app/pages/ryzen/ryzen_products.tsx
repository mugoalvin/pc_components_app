/* eslint-disable react-hooks/exhaustive-deps */
import ChipView from "@/app/components/ui/chipView";
import { filterRyzenWithPerformanceTier } from "@/utils/functions";
import { ProductBrandFilter, RyzenDeviceChipsOptions, RyzenTierChipsOptions } from "@/utils/types";
import useRyzenStore from "@/zustand/amd/ryzen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Divider, Menu, useTheme } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import { AmdDevice, RyzenDesktopSeries, RyzenLaptopSeries, RyzenSeriesArray, RyzenSeriesNameArray, RyzenSeriesNameEnum } from "../../../../packages/types";

import ChipCustom from "../../components/buttons/chips";
import ProductCard from "../../components/cards/productCard";
import HeaderBackArrow from "../../components/headerBackArrow";
import AppText from "../../components/texts/appText";
import SubTitle from "../../components/texts/subTitle";
import Body from "../../components/ui/body";
import SearchBarCustom from "../../components/ui/searchBarCustom";
import { syncRyzenInventory } from "../../index";
import { scrapeRyzen } from "../../services/scrape";


export default function RyzenProducts() {
	const theme = useTheme()
	const navigation = useNavigation()
	// @ts-expect-error
	const { amdSeries } = useLocalSearchParams() as Partial<ProductBrandFilter>

	const [isSearchBtnPressed, setIsSearchBtnPressed] = useState<boolean>(false)
	const [isScrapingInProgress, setIsScrapingInProgress] = useState<boolean>(false)
	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const [ryzenToDisplay, setRyzenToDisplay] = useState(ryzenInventory)

	const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState<boolean>(false)
	const openEllipsisMenu = () => setIsEllipsisMenuOpen(true)
	const closeEllipsisMenu = () => setIsEllipsisMenuOpen(false)

	const [deviceSelected, setDeviceSelected] = useState<RyzenDeviceChipsOptions>()
	const [chipPressed, setChipPressed] = useState<RyzenTierChipsOptions>('all')
	const [isAllChipClicked, setIsAllChipClicked] = useState<boolean>(true)
	const [isRyzen9ChipClicked, setIsRyzen9ChipClicked] = useState<boolean>(false)
	const [isRyzen7ChipClicked, setIsRyzen7ChipClicked] = useState<boolean>(false)
	const [isRyzen5ChipClicked, setIsRyzen5ChipClicked] = useState<boolean>(false)
	const [isRyzen3ChipClicked, setIsRyzen3ChipClicked] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipClicked(false)
		setIsRyzen9ChipClicked(false)
		setIsRyzen7ChipClicked(false)
		setIsRyzen5ChipClicked(false)
		setIsRyzen3ChipClicked(false)
	}

	const getAsyncData = async () => {
		const device = await AsyncStorage.getItem('chipPressed') as RyzenDeviceChipsOptions
		setDeviceSelected(device)
	}

	useEffect(() => {
		getAsyncData()
	})

	useEffect(() => {
		navigation.setOptions({
			title: RyzenSeriesNameEnum[amdSeries],
			headerLeft: () => (
				<HeaderBackArrow />
			),
			headerRight: () => (
				<View className="flex-row relative">
					<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={() => setIsSearchBtnPressed(prev => !prev)}>
						<Ionicons name={isSearchBtnPressed ? 'close-outline' : 'search-outline'} size={20} color={theme.colors.onBackground} />
					</TouchableOpacity>

					<Menu
						visible={isEllipsisMenuOpen}
						onDismiss={closeEllipsisMenu}
						anchor={
							<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={openEllipsisMenu}>
								<Ionicons name='ellipsis-vertical-sharp' size={20} color={theme.colors.onBackground} />
							</TouchableOpacity>
						}
						style={{
							marginTop: 50,
						}}
					>
						{							
							!isNaN(RyzenDesktopSeries[RyzenSeriesArray[Number(amdSeries)] as keyof typeof RyzenDesktopSeries]) &&
							<Menu.Item
								onPress={async () => {
									closeEllipsisMenu()
									setIsScrapingInProgress(true)
									await scrapeRyzen({
										isLaptop: AmdDevice.Desktop,
										series: RyzenDesktopSeries[RyzenSeriesArray[Number(amdSeries)] as keyof typeof RyzenDesktopSeries]
									})
									await syncRyzenInventory()
									setIsScrapingInProgress(false)
								}}
								title={
									<AppText>Scrape Desktop {RyzenSeriesNameEnum[amdSeries]}</AppText>
								}
							/>
						}

						{
							RyzenLaptopSeries[RyzenSeriesNameArray.lastIndexOf(RyzenSeriesNameEnum[Number(amdSeries)]) - 5] as keyof typeof RyzenLaptopSeries &&
							<Menu.Item
								onPress={async () => {
									closeEllipsisMenu()
									setIsScrapingInProgress(true)
									await scrapeRyzen({
										isLaptop: AmdDevice.Laptop,
										series: RyzenLaptopSeries[
											RyzenLaptopSeries[
											RyzenSeriesNameArray.lastIndexOf(RyzenSeriesNameEnum[Number(amdSeries)]) - 5
											] as keyof typeof RyzenLaptopSeries
										]
									})
									await syncRyzenInventory()
									setIsScrapingInProgress(false)
								}}
								title={
									<AppText>Scrape Laptop {RyzenSeriesNameEnum[amdSeries]}</AppText>
								}
							/>
						}
					</Menu>
				</View>
			)
		})

		setRyzenToDisplay(
			filterRyzenWithPerformanceTier(
				(deviceSelected === 'all' ?
					ryzenInventory :
					ryzenInventory.filter(ryzen => (ryzen.device)?.toLowerCase() === deviceSelected)
				).filter(ryzen => ryzen.series === RyzenSeriesNameEnum[amdSeries]),
				chipPressed
			)
		)
	}, [amdSeries, chipPressed, isSearchBtnPressed, isEllipsisMenuOpen, ryzenInventory, deviceSelected])


	return (
		<Body>
			{isSearchBtnPressed && <SearchBarCustom focused />}

			<ChipView>
				<ChipCustom chipText="All" selected={isAllChipClicked} onPress={() => {
					falsifyAllChips()
					setIsAllChipClicked(prev => !prev)
					setChipPressed('all')
				}} />
				<ChipCustom chipText="Ryzen 9" selected={isRyzen9ChipClicked} onPress={() => {
					falsifyAllChips();
					setIsRyzen9ChipClicked(prev => !prev);
					setChipPressed('9')
				}}
				/>
				<ChipCustom chipText="Ryzen 7" selected={isRyzen7ChipClicked} onPress={() => {
					falsifyAllChips();
					setIsRyzen7ChipClicked(prev => !prev);
					setChipPressed('7')
				}}
				/>
				<ChipCustom chipText="Ryzen 5" selected={isRyzen5ChipClicked} onPress={() => {
					falsifyAllChips();
					setIsRyzen5ChipClicked(prev => !prev);
					setChipPressed('5')
				}}
				/>
				<ChipCustom chipText="Ryzen 3" selected={isRyzen3ChipClicked} onPress={() => {
					falsifyAllChips();
					setIsRyzen3ChipClicked(prev => !prev);
					setChipPressed('3')
				}}
				/>
			</ChipView>


			<Animated.FlatList
				itemLayoutAnimation={LinearTransition}
				showsVerticalScrollIndicator={false}
				className="flex-1"
				data={ryzenToDisplay}
				keyExtractor={item => item.name}
				renderItem={({ item }) => (
					<ProductCard
						key={item.name}
						title={item.name}
						mainDescription={`${item.number_of_cpu_cores} cores ${item.number_of_threads} threads`}
						secondaryDescription={`${item.max_boost_clock} boost frequency`}
						extraInfo={item.launch_date}
						onPress={() =>
							router.push({
								pathname: './product_details',
								params: { processor: JSON.stringify(item) }
							})
						}
					/>
				)}
				ItemSeparatorComponent={() => <Divider bold />}
				ListEmptyComponent={() => (
					<View className="aspect-square items-center justify-end">
						<SubTitle>
							{
								isScrapingInProgress ? <ActivityIndicator /> :
									ryzenInventory.length > 0
										? ryzenToDisplay.length === 0 && "Sorry! None For This Tier"
										: "Data Not Yet Scraped"
							}
						</SubTitle>
					</View>
				)}
			/>
		</Body>
	)
}