import { openPage } from "@/utils/stackOptions";
import { ComponentTypeEnum } from '@/utils/types';
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import Row from '../components/row';
import Body from "../components/ui/body";
import CategoryDetails from '../components/ui/categoryDetails';
import SearchBarCustom from "../components/ui/searchBarCustom";


const Dashboard = () => {
	const theme = useTheme()
	const navigator = useNavigation()
	const [ searchValue, setSearchValue ] = useState<string>("")
	const [isSearchBarLoading, setIsSearchBarLoading] = useState<boolean>(false)
	const [ isSearchBtnPressed, setIsSearchBtnPressed ] = useState<boolean>(false)

	const changeButtonLoading = () => {
		setIsSearchBarLoading(prev => !prev)
		setTimeout(() => {
			setIsSearchBarLoading(prev => !prev)
		}, 2000);
	}
	

	useEffect(() => {
		navigator.setOptions({
			title: "Dashboard",
			headerRight: () => (
				<TouchableOpacity className='w-10 h-10 items-end justify-center' onPress={() => setIsSearchBtnPressed(prev => !prev)}>
					<Ionicons name={isSearchBtnPressed ? 'close-outline' : 'search-outline'} size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			),
		})
	})


	return (
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
					<CategoryDetails categoryName='Scrape' description="Source Data from the internet" icon='download' temporary onClick={() => router.push({ pathname: "/pages/scrape" })} />
				</Row>

			</ScrollView>
		</Body>
	)
}

export default Dashboard