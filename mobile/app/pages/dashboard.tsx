import { openPage } from "@/utils/stackOptions";
import { ComponentTypeEnum } from '@/utils/types';
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, useTheme } from "react-native-paper";

import Row from '../components/row';
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import PageWithBottomSheet from "../components/ui/bottomSheet";
import CategoryDetails from '../components/ui/categoryDetails';
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

	const closeSheet = () => {
		bottomSheetRef.current?.close()
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

				<ScrollView className='flex-col' style={{ rowGap: 10 }}>
					<Row>
						<CategoryDetails categoryName='Processor' description='CPU cores and performance' icon='memory' onClick={() => openPage({ selectedComponent: ComponentTypeEnum.Processors })} />
						<CategoryDetails categoryName='Graphics Cards' description="GPU's for gaming and workstations" icon='monitor' onClick={() => openPage({ selectedComponent: ComponentTypeEnum.Graphics })} />
					</Row>
					<Row>
						<CategoryDetails categoryName='Memory' description='RAM modules and storage' icon='storage' />
						<CategoryDetails categoryName='Motherboards' description='System boards and chipsets' icon='all-out' />
					</Row>
					<Row>
						<CategoryDetails categoryName='Storage' description="SSD's, HDD's and NVME drives" icon='storage' />
						<CategoryDetails categoryName='Scrape' description="Source Data from the internet" icon='download' onClick={() => router.push({ pathname: "/pages/scrape" })} />
					</Row>
				</ScrollView>
			</Body>
		</PageWithBottomSheet>
	)
}

export default Dashboard