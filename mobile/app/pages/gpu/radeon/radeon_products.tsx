import CategoryListing from "@/app/components/cards/categoryListing"
import HeaderBackArrow from "@/app/components/headerBackArrow"
import Body from "@/app/components/ui/body"
import { radeonBrandsArray } from "@/utils/brands/graphicsBrands"
import { openPage } from "@/utils/stackOptions"
import { ProductBrandFilter } from "@/utils/types"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { useEffect } from "react"
import { FlatList } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { RadeonEnum } from "../../../../../packages/types"

export default function RadeonProducts() {
	const navigation = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent, brand } = params

	useEffect(() => {
		navigation.setOptions({
			title: "Radeon",
			headerLeft: () => <HeaderBackArrow />
		})
	}, [])

	return (
		<Body>
			<FlatList
				data={radeonBrandsArray}
				renderItem={({ item, index }) =>
					<Animated.View key={index} entering={FadeInDown.duration(600).delay(100 * (index + 1))}>
						<CategoryListing
							key={item.name}
							label={item.name}
							image={item.logoImage}
							tables={item.tableNames}
							onClick={() =>
								openPage({
									selectedComponent: Number(selectedComponent),
									brand: Number(brand),
									radeonLine: RadeonEnum[item.enumName as keyof typeof RadeonEnum]
								})
							}
						/>
					</Animated.View>
				}
			/>
		</Body>
	)
}

