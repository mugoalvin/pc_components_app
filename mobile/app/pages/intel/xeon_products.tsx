import { syncIntelXeonInventory } from "@/app/index"
import ChipCustom from "@/app/components/buttons/chips"
import ProductCard from "@/app/components/cards/productCard"
import HeaderBackArrow from "@/app/components/headerBackArrow"
import Body from "@/app/components/ui/body"
import ChipView from "@/app/components/ui/chipView"
import { ProductBrandFilter } from "@/utils/types"
import useIntelXeonStore from "@/zustand/intel/xeon"
import { router, useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect } from "react"
import Animated from "react-native-reanimated"

export default function XeonProducts() {
	const navigation = useNavigation()
	// @ts-expect-error
	const { xeonSeries } = useLocalSearchParams() as Partial<ProductBrandFilter>

	const xeonInventory = useIntelXeonStore(state => state.xeon_inventory)

	useEffect(() => {
		navigation.setOptions({
			title: 'Intel Xeon',
			headerLeft: () => <HeaderBackArrow />
		})

		syncIntelXeonInventory()
	}, [])

	return (
		<Body>
			<ChipView>
				<ChipCustom selected chipText="All" />
			</ChipView>

			<Animated.FlatList
				data={xeonInventory}
				renderItem={({ item, index }) => (
					<ProductCard
						key={index}
						title={item.name}
						mainDescription={`${item.total_cores} cores ${item.total_threads} threads`}
						secondaryDescription={`${item.max_turbo_frequency} max turbo frequency`}
						extraInfo={item.recommended_customer_price || item.launch_date}
						onPress={() =>
							router.push({
								pathname: '/pages/product_details',
								params: { processor: JSON.stringify(item) }
							})
						}
					/>
				)}
			/>
		</Body>
	)
}