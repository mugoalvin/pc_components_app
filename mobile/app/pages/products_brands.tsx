import { graphicsBrandsArray } from "@/utils/brands/graphicsBrands"
import { processorsBrandsArray } from "@/utils/brands/processorsBrands"
import { openPage } from '@/utils/stackOptions'
import { DashboardCategoryTypeArray, ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import { syncIntelCoreInventoryCount, syncIntelUltraInventoryCount, syncIntelXeonInventoryCount, syncRyzenInventoryCount } from "@/app/index"
import useSnackbarContext from "@/context/SnackbarContext"
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

	const [isPageRefreshing, setIsPageRefreshing] = useState<boolean>(false)

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
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={isPageRefreshing}
						onRefresh={async () => {
							setIsPageRefreshing(true)
							runSync()
							setIsPageRefreshing(false)
						}}
					/>
				}
			>
				{
					String(selectedComponent) === "0" && (
						processorsBrandsArray.map(brand => {
							return (
								<CategoryListing
									key={brand.name}
									label={brand.name}
									image={brand.logoImage}
									tables={brand.tableNames}
									onClick={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: ProcessorsEnum[brand.name as keyof typeof ProcessorsEnum]
									})}
								/>
							)
						})
					)
				}


				{
					String(selectedComponent) === "1" && (
						graphicsBrandsArray.map(brand => {
							return (
								<CategoryListing
									key={brand.name}
									label={brand.name}
									image={brand.logoImage}
									tables={brand.tableNames}
									onClick={() => openPage({
										selectedComponent: Number(selectedComponent),
										brand: GraphicsBrandEnum[brand.enumName as keyof typeof GraphicsBrandEnum]
									})}
								/>
							)
						})
					)
				}

			</ScrollView>
		</Body>
	)
}