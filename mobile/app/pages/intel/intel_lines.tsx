import { syncIntelCoreInventoryCount, syncIntelUltraInventoryCount, syncIntelXeonInventoryCount } from "@/app/index";
import { openPage } from "@/utils/stackOptions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { IntelProcessorLine } from "../../../../packages/types";
import CategoryListing from "../../components/cards/categoryListing";
import HeaderBackArrow from "../../components/headerBackArrow";
import Body from "../../components/ui/body";

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
			<ScrollView
				className='gap-3'
				showsVerticalScrollIndicator={false}
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
			>
				<CategoryListing
					label="Ultra"
					tables="ultra"
					image="http://alitech.io/wp-content/uploads/2023/12/Unleashing-Intels-Core-Ultra-CPUs-A-Deep-Dive-into-the-Future-of-Processing-Power5-300x225.png"
					onClick={() => openPage({
						selectedComponent: Number(selectedComponent),
						brand: Number(brand),
						line: IntelProcessorLine.Ultra
					})}
				/>

				<CategoryListing
					label="Core"
					tables="core"
					image="https://upload.wikimedia.org/wikipedia/commons/0/06/Intel_Core_i9_Logo_2020.png?20210405130213"
					onClick={() => openPage({
						selectedComponent: Number(selectedComponent),
						brand: Number(brand),
						line: IntelProcessorLine.Core
					})}
				/>

				<CategoryListing
					label="Xeon"
					tables="xeon"
					image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Intel-Xeon-Badge-2024.jpg/250px-Intel-Xeon-Badge-2024.jpg"
					onClick={() => openPage({
						selectedComponent: Number(selectedComponent),
						brand: Number(brand),
						line: IntelProcessorLine.Xeon
					})}
				/>
			</ScrollView>
		</Body>
	)
}