import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

import ThemeChooser from "../components/buttomSheet/themeChooser";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import PageWithBottomSheet from "../components/ui/bottomSheet";
import Components from "../components/ui/dashboard/components";
import NewComponents from "../components/ui/dashboard/newComponents";
import RecommendedForYou from "../components/ui/dashboard/recommendedForYou";
import DashboardSection from "../components/ui/dashboard/section";
import ToolsAndUtils from "../components/ui/dashboard/tools&Utils";
import { connectDatabase } from '../services/scrape';


const Dashboard = () => {
	const theme = useTheme()
	const navigator = useNavigation()

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['50%', '75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)

	useEffect(() => {
		navigator.setOptions({
			title: "Dashboard"
		})

		connectDatabase()
	}, [])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={ <ThemeChooser /> }
		>
			<Body>
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
						BodyComponent={<NewComponents />}
					/>

					<DashboardSection
						HeaderComponent={
							<AppText bold className="text-2xl">Core Components</AppText>
						}
						BodyComponent={<Components />}
					/>

					<DashboardSection
						HeaderComponent={
							<AppText bold className="text-2xl">Tools & Utilities</AppText>
						}
						BodyComponent={<ToolsAndUtils openSheet={openSheet} />}
					/>
					
				</ScrollView>
			</Body>
		</PageWithBottomSheet>
	)
}

export default Dashboard