import ChipCustom from "@/app/components/buttons/chips";
import ProductCard from "@/app/components/cards/productCard";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import { getAsyncData } from "@/utils/functions";
import { ProductBrandFilter, UltraDeviceChipsOptions, UltraSeriesChipsOptions } from "@/utils/types";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import { IntelCoreUltra } from "../../../../packages/interfaces";

export default function UltraProducts(){
	const navigation = useNavigation()
	// @ts-expect-error
	const { ultraSeries } = useLocalSearchParams() as Partial<ProductBrandFilter>

	const [seriesSelected, setSeriesSelected] = useState<UltraSeriesChipsOptions>('all')
	const [isAllChipSelected, setIsAllChipSelected] = useState<boolean>(true)
	const [isSeries2ChipSelected, setisSeries2ChipSelected] = useState<boolean>(false)
	const [isSeries1ChipSelected, setisSeries1ChipSelected] = useState<boolean>(false)

	const falsifyAllChips = () => {
		setIsAllChipSelected(false)
		setisSeries2ChipSelected(false)
		setisSeries1ChipSelected(false)
	}


	const ultraInventoryAll = useIntelCoreUltraStore(state => state.intel_ultra_inventory);
	const [ultraToDisplay, setUltraToDisplay] = useState<IntelCoreUltra[]>([]);

	useEffect(() => {
		async function updateAndFilter() {
			const deviceVal = await getAsyncData('chipPressed') as UltraDeviceChipsOptions;
			// setDevice(deviceVal);

			let filtered = ultraInventoryAll;
			if (ultraSeries) {
				filtered = filtered.filter(ultra => ultra.name?.includes(ultraSeries));
			}
			if (deviceVal && deviceVal !== 'all') {
				filtered = filtered.filter(ultra => (ultra.vertical_segment)?.toLowerCase() === deviceVal);
			}
			setUltraToDisplay(
				seriesSelected === 'all'
					? filtered
					: filtered.filter(ultra => ultra.series?.toLowerCase() === seriesSelected)
			);
		}
		updateAndFilter();
	}, [seriesSelected, ultraSeries, ultraInventoryAll]);

	useEffect(() => {
		navigation.setOptions({
			title: `Intel ${ ultraSeries }`,
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
					selected={isAllChipSelected}
					onPress={() => {
						falsifyAllChips()
						setIsAllChipSelected(prev => !prev)
						setSeriesSelected('all')
					}}
				/>
				<ChipCustom
					chipText="Series 2"
					selected={isSeries2ChipSelected}
					onPress={() => {
						falsifyAllChips();
						setisSeries2ChipSelected(prev => !prev);
						setSeriesSelected('series 2')
					}}
				/>
				<ChipCustom chipText="Series 1"
					selected={isSeries1ChipSelected}
					onPress={() => {
						falsifyAllChips();
						setisSeries1ChipSelected(prev => !prev);
						setSeriesSelected('series 1')
					}}
				/>
			</ChipView>

			<Animated.FlatList
				itemLayoutAnimation={LinearTransition}
				data={ultraToDisplay}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => (
					<ProductCard
						key={item.name}
						title={item.name}
						mainDescription={`${ item.number_of_performance_cores } cores ${ item.total_threads } threads`}
						secondaryDescription={`${item.max_turbo_frequency} max turbo frequency`}
						extraInfo={item.recommended_customer_price || item.launch_date}
					/>
				)}
				ItemSeparatorComponent={() => <Divider bold/>}
			/>


		</Body>
	)
}