import { graphicsBrandsArray } from "@/utils/brands/graphicsBrands"
import { processorsBrandsArray } from "@/utils/brands/processorsBrands"
import { openPage } from '@/utils/stackOptions'
import { DashboardCategoryTypeArray, ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'

import { GraphicsBrandEnum, ProcessorsEnum } from "../../../packages/types"
import CategoryListing from '../components/cards/categoryListing'
import HeaderBackArrow from "../components/headerBackArrow"
import Body from '../components/ui/body'

export default function ProductsBrands() {
	const navigator = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>
	const { selectedComponent } = params
	const capitalizeFirstCharacter = (text: string) => (text.slice(0, 1) as string).toUpperCase().concat((text as string).slice(1))

	useEffect(() => {
		navigator.setOptions({
			title: capitalizeFirstCharacter(DashboardCategoryTypeArray[selectedComponent || 0]),
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	})

	return (
		<Body>
			<ScrollView className='gap-3'>
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