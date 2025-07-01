import ChipCustom from "@/app/components/buttons/chips";
import ProductOverviewCard from "@/app/components/cards/productOverviewCard";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import AppText from "@/app/components/texts/appText";
import ChipView from "@/app/components/ui/chipView";
import { getSectionedUltraData, setAsyncData } from "@/utils/functions";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter, SectionedDataItem, UltraDeviceChipsOptions } from "@/utils/types";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { IntelUltraTierArray, IntelUltraTierEnum } from "../../../../packages/types";
import Body from "../../components/ui/body";

export default function UltraLine() {
	const theme = useTheme()
	const navigation = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	// @ts-expect-error
	const { selectedComponent, brand, line } = params

	const [chipPressed, setChipPressed] = useState<UltraDeviceChipsOptions>('all')
	const [isAllSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isDesktopChipSelected, setIsDesktopChipSelected] = useState<boolean>(false)
	const [isMobileChipSelected, setIsMobileChipSelected] = useState<boolean>(false)
	const [isEmbeddedChipSelected, setIsEmbeddedChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setIsDesktopChipSelected(false)
		setIsMobileChipSelected(false)
		setIsEmbeddedChipSelected(false)
	}

	const ultraInventory = useIntelCoreUltraStore(state => state.intel_ultra_inventory)
	const [sectionedUltraData, setSectionedUltraData] = useState<SectionedDataItem[]>([])

	useEffect(() => {
		setAsyncData('chipPressed', chipPressed)
		setSectionedUltraData(
			getSectionedUltraData(
				chipPressed === 'all' ?
					ultraInventory :
					ultraInventory.filter(ultra => (ultra.vertical_segment)?.toLowerCase() === chipPressed)
			)
		)
	}, [chipPressed, ultraInventory])
	
	useEffect(() => {
		navigation.setOptions({
			title: "Ultra",
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	})

	return (
		<Body>
			<ChipView>
				<ChipCustom
					chipText="All"
					selected={isAllSelected}
					onPress={() => {
						falsifyAllChips()
						setIsAllChipSelected(prev => !prev)
						setChipPressed('all')
					}}
				/>
				<ChipCustom
					chipText="Desktop"
					selected={isDesktopChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsDesktopChipSelected(prev => !prev)
						setChipPressed('desktop')
					}}
				/>
				<ChipCustom
					chipText="Mobile"
					selected={isMobileChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsMobileChipSelected(prev => !prev)
						setChipPressed('mobile')
					}}
				/>
				<ChipCustom
					chipText="Embedded"
					selected={isEmbeddedChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsEmbeddedChipSelected(prev => !prev)
						setChipPressed('embedded')
					}}
				/>
			</ChipView>


			<SectionList
				sections={sectionedUltraData}
				keyExtractor={( item, index ) => item.name + index}
				renderSectionHeader={({ section: { title } }) => (
					<AppText
						key={title}
						bg_color={theme.colors.surface}
						bold
						className='text-2xl pt-4 mb-2'
						color={theme.colors.onBackground}
					>
						{ title }
					</AppText>
				)}
				renderItem={() => null}

				renderSectionFooter={({ section }) => (
					<View
						className="p-2 rounded-xl"
						style={{ backgroundColor: theme.colors.elevation.level2 }}
					>
						{
							(section.data).map((item, index) =>
								<ProductOverviewCard
									key={index}
									title={item.name}
									index={index}
									productCount={item.count}
									// @ts-expect-error
									onPress={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: Number(brand),
										line: Number(line),
										ultraSeries: item.name,
										ultraTier: Number(IntelUltraTierEnum[IntelUltraTierArray[index] as keyof typeof IntelUltraTierEnum])
									})}
								/>
							)
						}
					</View>
				)}
			/>
		</Body>
	)
}