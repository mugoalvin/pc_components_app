import { graphicsBrandsArray } from "@/utils/brands/graphicsBrands"
import { processorsBrandsArray } from "@/utils/brands/processorsBrands"
import { openPage } from '@/utils/stackOptions'
import { DashboardCategoryTypeArray, ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import Animated, { FadeInDown } from "react-native-reanimated"

import { syncIntelCoreInventoryCount, syncIntelUltraInventoryCount, syncIntelXeonInventoryCount, syncRyzenInventoryCount } from "@/app/index"
import useSnackbarContext from "@/context/SnackbarContext"
import { Divider } from "react-native-paper"
import { GraphicsBrandEnum, ProcessorsEnum } from "../../../packages/types"
import CategoryListing from '../components/cards/categoryListing'
import HeaderBackArrow from "../components/headerBackArrow"
import Body from '../components/ui/body'

export default function ProductsBrands() {
	const navigator = useNavigation()
	const { showSnackbar } = useSnackbarContext()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>
	const { selectedComponent } = params
	const capitalizeFirstCharacter = (text: string) => (text.slice(0, 1) as string).toUpperCase().concat((text as string).slice(1))

	const runSync = async () => {
		try {
			await syncRyzenInventoryCount()
			await syncIntelCoreInventoryCount()
			await syncIntelUltraInventoryCount()
			await syncIntelXeonInventoryCount()
		}
		catch (error: any) {
			showSnackbar({
				message: error.message,
				isError: true
			})
		}
	}

	useEffect(() => {
		navigator.setOptions({
			title: capitalizeFirstCharacter(DashboardCategoryTypeArray[selectedComponent || 0]),
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})


		runSync()
	}, [])

	return (
		<Body>
			{
				String(selectedComponent) === "0" && (
					<FlatList
						data={processorsBrandsArray}
						renderItem={({ item, index }) =>
							<Animated.View key={index} entering={FadeInDown.duration(600).delay(100*(index + 1))}>
								<CategoryListing
									key={item.name}
									label={item.name}
									image={item.logoImage}
									tables={item.tableNames}
									onClick={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: ProcessorsEnum[item.name as keyof typeof ProcessorsEnum]
									})}
								/>
							</Animated.View>
						}
					/>
				)
			}

			{
				String(selectedComponent) === "1" && (
					<FlatList
						data={graphicsBrandsArray}
						renderItem={({ item, index }) =>
							<Animated.View key={index} entering={FadeInDown.duration(600).delay(100*(index + 1))}>
								<CategoryListing
									key={item.name}
									label={item.name}
									image={item.logoImage}
									tables={item.tableNames}
									onClick={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: GraphicsBrandEnum[item.enumName as keyof typeof GraphicsBrandEnum]
									})}
								/>
							</Animated.View>
						}
					/>
				)
			}
		</Body>
	)
}