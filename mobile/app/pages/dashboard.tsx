import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

import { openPage } from "@/utils/stackOptions";
import { DashboardCategoryTypeEnum } from '@/utils/types';
import { ScrollView } from "react-native-gesture-handler";
import Row from '../components/row';
import Body from "../components/ui/body";
import CategoryDetails from '../components/ui/categoryDetails';
import SearchBarCustom from "../components/ui/searchBarCustom";


const Dashboard = () => {
	const theme = useTheme()
	const navigator = useNavigation()
	const [ searchValue, setSearchValue ] = useState<string>("")
	const [ isSearchBarloading, setIsSearchBarloading ] = useState<boolean>(false)
	const [ isSearchBtnPressed, setIsSearchBtnPressed ] = useState<boolean>(false)

	const changeButtonLoading = () => {
		setIsSearchBarloading(prev => !prev)
		setTimeout(() => {
			setIsSearchBarloading(prev => !prev)
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
						isSearchBarloading={isSearchBarloading}
						searchValue={searchValue}
						changeButtonLoading={changeButtonLoading}
						setSearchValue={setSearchValue}
					/>
			}

			<ScrollView className='flex-col' style={{ rowGap: 10 }}>
				<Row>
					<CategoryDetails categoryName='Processor' description='CPU cores and performance' icon='memory' onClick={() => openPage({ product: DashboardCategoryTypeEnum.Processors })} />
					<CategoryDetails categoryName='Graphics Cards' description="GPU's for gaming and workstations" icon='monitor' onClick={() => openPage({ product: DashboardCategoryTypeEnum.Graphics })} />
				</Row>
				<Row>
					<CategoryDetails categoryName='Memory' description='RAM modules and storage' icon='storage' />
					<CategoryDetails categoryName='Motherboards' description='System boards and chipsets' icon='all-out' />
				</Row>
				<Row>
					<CategoryDetails categoryName='Storage' description="SSD's, HDD's and NVME drives" icon='storage' />
				</Row>

			</ScrollView>
		</Body>
	)
}

export default Dashboard