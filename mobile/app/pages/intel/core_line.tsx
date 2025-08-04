import ThemeChooser from "@/app/components/buttomSheet/themeChooser";
import ChipCustom from "@/app/components/buttons/chips";
import ProductOverviewCard from "@/app/components/cards/productOverviewCard";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import AppText from "@/app/components/texts/appText";
import Body from "@/app/components/ui/body";
import PageWithBottomSheet from "@/app/components/ui/bottomSheet";
import ChipView from "@/app/components/ui/chipView";
import SectionListParentView from "@/app/components/view/sectionListParentView";
import { syncIntelCoreInventory } from "@/app/index";
import { getSectionedCoreData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { CoreDeviceChipsOptions, ProductBrandFilter } from "@/utils/types";
import useIntelCoreStore from "@/zustand/intel/core";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, SectionList, TouchableOpacity, useColorScheme, View } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { IntelGenerationEnum } from "../../../../packages/types";
import EmptySectionList from "@/app/components/view/emptySectionList";

export default function CoreLine() {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	const navigation = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	// @ts-expect-error
	const { selectedComponent, brand, line } = params

	const [chipPressed, setChipPressed] = useState<CoreDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllSelected] = useState<boolean>(true)
	const [isEmbeddedSelected, setIsEmbeddedSelected] = useState<boolean>(false)
	const [isDesktopSelected, setIsDesktopSelected] = useState<boolean>(false)
	const [isMobileSelected, setIsMobileSelected] = useState<boolean>(false)

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllSelected(false)
		setIsEmbeddedSelected(false)
		setIsDesktopSelected(false)
		setIsMobileSelected(false)
	}

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const openMenu = () => setIsMenuOpen(true)
	const closeMenu = () => setIsMenuOpen(false)

	const bottomSheetRef = useRef<BottomSheetMethods>(null)
	const snapPoints = useMemo(() => ['50%', '75%'], [])
	const openSheet = () => bottomSheetRef.current?.snapToIndex(0)

	const coreInventory = useIntelCoreStore(state => state.intel_core_inventory) || []

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Core",
			headerLeft: () => <HeaderBackArrow />,
			headerRight: () => (
				<View className="flex-row relative">
					<Menu
						visible={isMenuOpen}
						onDismiss={closeMenu}
						anchor={
							<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={openMenu}>
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
						<Menu.Item
							title={
								<AppText>Open Bottom Sheet</AppText>
							}
							onPress={() => { closeMenu(); openSheet() }}
						/>

					</Menu>
				</View>
			)
		})
	})

	useEffect(() => {
	}, [chipPressed])

	return (
		<PageWithBottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			initialSnapIndex={-1}
			sheetContent={<ThemeChooser />}
		>
			<Body>
				<ChipView>
					<ChipCustom
						selected={isAllSelected}
						chipText="All"
						onPress={() => {
							falsifyAllChips()
							setIsAllSelected(true)
							setChipPressed("all")
						}}
					/>
					<ChipCustom
						selected={isEmbeddedSelected}
						chipText="Embedded"
						onPress={() => {
							falsifyAllChips()
							setIsEmbeddedSelected(true)
							setChipPressed("embedded")
						}}
					/>
					<ChipCustom
						selected={isDesktopSelected}
						chipText="Desktop"
						onPress={() => {
							falsifyAllChips()
							setIsDesktopSelected(true)
							setChipPressed("desktop")
						}}
					/>
					<ChipCustom
						selected={isMobileSelected}
						chipText="Mobile"
						onPress={() => {
							falsifyAllChips()
							setIsMobileSelected(true)
							setChipPressed("mobile")
						}}
					/>
				</ChipView>

				<SectionList
					stickySectionHeadersEnabled
					showsVerticalScrollIndicator={false}
					sections={
						getSectionedCoreData(
							chipPressed === 'all' ?
								coreInventory :
								coreInventory.filter(core => core.vertical_segment?.trim().toLowerCase() === chipPressed),
							chipPressed
						)
					}
					keyExtractor={(item, index) => item.name + index}
					refreshControl={
						<RefreshControl
							colors={[theme.colors.inversePrimary, theme.colors.errorContainer]}
							progressBackgroundColor={theme.colors.inverseSurface}
							refreshing={isPageRefreshing}
							onRefresh={async () => {
								setIsPageRefreshing(true)
								await syncIntelCoreInventory()
								setIsPageRefreshing(false)
							}}
						/>
					}
					renderSectionHeader={({ section: { title } }) => (
						<AppText
							key={title}
							bg_color={colorScheme === 'light' ? theme.colors.elevation.level0 : theme.colors.surface}
							bold
							className='text-2xl pt-4 mb-2'
							color={theme.colors.onBackground}
						>
							{title}
						</AppText>
					)}
					renderItem={() => null}

					renderSectionFooter={({ section }) => (
						<SectionListParentView>
							{
								(section.data).map((item, index) =>
									<ProductOverviewCard
										key={index}
										title={item.name}
										index={index}
										series={item.tableColumnData}
										lastUpdated={item.lastUpdated}
										productCount={item.count}
										onPress={() => openPage({
											selectedComponent: Number(selectedComponent),
											brand: Number(brand),
											line: Number(line),
											generation: Number(IntelGenerationEnum[item.generation as keyof typeof IntelGenerationEnum])
										})}
									/>
								)
							}
						</SectionListParentView>
					)}
					
					ListEmptyComponent={ <EmptySectionList /> }
				/>
			</Body>
		</PageWithBottomSheet>
	)
}