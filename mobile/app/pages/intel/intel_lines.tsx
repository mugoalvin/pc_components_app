import { syncIntelCoreInventoryCount, syncIntelUltraInventoryCount, syncIntelXeonInventoryCount } from "@/app/index";
import { intelProcessorFamilies } from "@/utils/brands/processorsBrands";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CategoryListing from "../../components/cards/categoryListing";
import HeaderBackArrow from "../../components/headerBackArrow";
import Body from "../../components/ui/body";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function IntelLines() {
	const navigation = useNavigation()
	const { selectedComponent, brand } = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

	useEffect(() => {
		navigation.setOptions({
			title: "Intel Lines",
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	}, [])

	return (
		<Body>
			<FlatList
				data={intelProcessorFamilies}
				renderItem={({ item, index }) =>
					<Animated.View key={index} entering={FadeInDown.delay(100*(index + 1))}>
						<CategoryListing
							label={item.name}
							tables={item.tables}
							image={item.image}
							onClick={() => openPage({
								selectedComponent: Number(selectedComponent),
								brand: Number(brand),
								line: Number(item.line)
							})}
						/>
					</Animated.View>
				}
				refreshControl={
					<RefreshControl
						refreshing={isPageRefreshing}
						onRefresh={async () => {
							setIsPageRefreshing(true)
							await syncIntelCoreInventoryCount()
							await syncIntelUltraInventoryCount()
							await syncIntelXeonInventoryCount()
							setIsPageRefreshing(false)
						}}
					/>
				}
			/>
		</Body>
	)
}