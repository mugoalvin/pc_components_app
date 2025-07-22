import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, useTheme } from "react-native-paper";

import { openPage } from "@/utils/stackOptions";
import { ComponentTypeEnum } from "@/utils/types";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import PageWithBottomSheet from "../components/ui/bottomSheet";
import CoreComponents from "../components/ui/dashboard/coreComponent";
import DashboardSection from "../components/ui/dashboard/section";
import NewParts from "../components/ui/newParts";
import RecommendedForYou from "../components/ui/recommendedForYou";
import SearchBarCustom from "../components/ui/searchBarCustom";
import ThemeChooser from "../components/ui/themeChooser";


const Dashboard = () => {
	const theme = useTheme()
	const navigator = useNavigation()
	const [searchValue, setSearchValue] = useState<string>("")
	const [isSearchBarLoading, setIsSearchBarLoading] = useState<boolean>(false)
	const [isSearchBtnPressed, setIsSearchBtnPressed] = useState<boolean>(false)

	const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState<boolean>(false)
	const openEllipsisMenu = () => setIsEllipsisMenuOpen(true)
	const closeEllipsisMenu = () => setIsEllipsisMenuOpen(false)


	const changeButtonLoading = () => {
		setIsSearchBarLoading(prev => !prev)
		setTimeout(() => {
			setIsSearchBarLoading(prev => !prev)
		}, 2000);
	}

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['33%', '75%', '95%'], [])

	const openSheet = () => {
		bottomSheetRef.current?.snapToIndex(0)
	}

	useEffect(() => {
		navigator.setOptions({
			title: "Dashboard",
			headerRight: () => (
				<>
					<TouchableOpacity className='w-10 h-10 items-end justify-center' onPress={() => setIsSearchBtnPressed(prev => !prev)}>
						<Ionicons name={isSearchBtnPressed ? 'close-outline' : 'search-outline'} size={20} color={theme.colors.onBackground} />
					</TouchableOpacity>

					<Menu
						visible={isEllipsisMenuOpen}
						onDismiss={closeEllipsisMenu}
						anchor={
							<TouchableOpacity className='w-10 h-10 items-end justify-center' onPress={openEllipsisMenu}>
								<Ionicons name={'ellipsis-vertical'} size={20} color={theme.colors.onBackground} />
							</TouchableOpacity>
						}
						style={{
							marginTop: 50,
						}}
					>
						<Menu.Item
							onPress={() => {
								closeEllipsisMenu()
								openSheet()
							}}
							title={
								<AppText>App Appearance</AppText>
							}
						/>
					</Menu>
				</>
			),
		})
	})


	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={
				<ThemeChooser />
			}
		>

			<Body>
				{
					isSearchBtnPressed &&
					<SearchBarCustom
						isSearchBarloading={isSearchBarLoading}
						searchValue={searchValue}
						changeButtonLoading={changeButtonLoading}
						setSearchValue={setSearchValue}
					/>
				}

				<ScrollView showsVerticalScrollIndicator={false} className='flex-col'>

					<DashboardSection
						HeaderComponent={
							<View className="flex-row gap-2 items-start">
								<FontAwesome6 name="gripfire" color={theme.colors.primary} size={20} />
								<AppText bold className="text-2xl">Recommended For You</AppText>
							</View>
						}
						BodyComponent={<RecommendedForYou />}
					/>

					<DashboardSection
						HeaderComponent={
							<View className="flex-row gap-2 items-baseline">
								<AppText bold className="text-3xl" color={theme.colors.primary}>NEW</AppText>
								<AppText bold className="text-2xl">Components</AppText>
							</View>
						}
						BodyComponent={
							<ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
								{
									[1, 2, 3, 4].map((component, index) =>
										<NewParts
											key={index}
											index={index}
											image="https://static.gigabyte.com/StaticFile/Image/Global/8672dbdf9d50a340b83d98d5399729ca/Product/32032/webp/1000"
											title="Ryzen 9 9950X"
											description="16-Core - 5.7GHz"
										/>
									)
								}
							</ScrollView>
						}
					/>

					<DashboardSection
						HeaderComponent={
							<AppText bold className="text-2xl">Core Components</AppText>
						}
						BodyComponent={
							<View className="flex-row justify-between">
								<CoreComponents key="processor" title="Processors" extra="AMD & Intel" iconLib="MaterialIcons" icon="memory" onPress={() => openPage({ selectedComponent: ComponentTypeEnum.Processors })} />
								<CoreComponents key="gpu" title='Graphics Cards' extra="Nvidia, Radeon" iconLib="MaterialIcons" icon='monitor' onPress={() => openPage({ selectedComponent: ComponentTypeEnum.Graphics })} />
							</View>
						}
					/>

					<DashboardSection
						HeaderComponent={
							<AppText bold className="text-2xl">Tools & Utilities</AppText>
						}
						BodyComponent={
							<View className="flex-col gap-2 justify-between">
								<CoreComponents key="scrape" title='Scraper' extra="Source Parts From The Web" iconLib="MaterialIcons" icon='download' full onPress={() => router.push({ pathname: "/pages/scrape" })} />
								<CoreComponents key="settings" title='Settings' iconLib="FontAwesome6" icon='gear' full onPress={openSheet} />
							</View>
						}
					/>

				</ScrollView>
			</Body>
		</PageWithBottomSheet>
	)
}

export default Dashboard