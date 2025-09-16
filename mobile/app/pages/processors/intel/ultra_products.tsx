import ChipCustom from "@/app/components/buttons/chips";
import ProductCard from "@/app/components/cards/productCard";
import HeaderBackArrow from "@/app/components/headerBackArrow";
import Body from "@/app/components/ui/body";
import ChipView from "@/app/components/ui/chipView";
import { getAsyncData } from "@/utils/functions";
import { ProductBrandFilter, UltraDeviceChipsOptions, UltraSeriesChipsOptions } from "@/utils/types";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { IntelCoreUltra } from "../../../../../packages/interfaces";

export default function UltraProducts() {
	const navigation = useNavigation()
	const { ultraSeries } = useLocalSearchParams() as Partial<ProductBrandFilter | any>

	const [seriesSelected, setSeriesSelected] = useState<UltraSeriesChipsOptions>('all')

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
			title: `Intel ${ultraSeries}`,
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	}, [])

	return (
		<Body>
			<ChipView>
				<ChipCustom
					chipText="All"
					selected={seriesSelected === 'all'}
					onPress={() => {
						setSeriesSelected('all')
					}}
				/>
				<ChipCustom
					chipText="Series 2"
					selected={seriesSelected === 'series 2'}
					onPress={() => {
						setSeriesSelected('series 2')
					}}
				/>
				<ChipCustom chipText="Series 1"
					selected={seriesSelected === 'series 1'}
					onPress={() => {
						setSeriesSelected('series 1')
					}}
				/>
			</ChipView>

			<FlashList
				showsVerticalScrollIndicator={false}
				data={ultraToDisplay}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Animated.View
						entering={FadeInLeft.duration(500).delay(100 * (index + 1))}
						exiting={FadeOutRight.duration(500).delay(100 * (index + 1))}
						key={item.name}
					>
						{index !== 0 && <Divider bold />}
						<ProductCard
							key={item.name}
							title={item.name}
							mainDescription={`${item.number_of_performance_cores} cores ${item.total_threads} threads`}
							secondaryDescription={`${item.max_turbo_frequency} max turbo frequency`}
							extraInfo={item.recommended_customer_price || item.launch_date}
							onPress={() =>
								router.push({
									pathname: './product_details',
									params: { processor: JSON.stringify(item) }
								})
							}
						/>
					</Animated.View>
				)}
			/>

		</Body>
	)
}