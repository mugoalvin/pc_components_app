import Index from '@/app'
import ProductsBrands from '@/app/pages/products_brands'
import { isSet } from '@/utils/functions'
import { ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'
import Brand from './brand'
import IntelLines from './intelLines'
import ProductDetails from './product_details'
import ProductsNavigator from './products'


export default function CategoryNavigator() {
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>


	// @ts-ignore
	const { selectedComponent, brand, line, amdSeries, ultraSeries, generation } = params

	if (!isSet(selectedComponent)) return <Index />

	if (isSet(selectedComponent) && !isSet(brand)) return <ProductsBrands />

	if (isSet(selectedComponent) && String(selectedComponent) === "0" && isSet(brand) && String(brand) === "1") return <IntelLines />

	if (isSet(selectedComponent) && isSet(brand) && (!isSet(amdSeries) && !isSet(ultraSeries))) return <Brand />

	if (isSet(selectedComponent) && isSet(brand) && (isSet(amdSeries) || isSet(ultraSeries)) && (!isSet(generation) || !isSet(line))) return <ProductsNavigator />

	if (isSet(selectedComponent) && isSet(brand) && (isSet(amdSeries) || isSet(ultraSeries)) && (isSet(generation) || isSet(line))) return <ProductDetails />


	return (
		<Body>
			<AppText>Product: {selectedComponent}</AppText>
			<AppText>Brand: {brand}</AppText>
			<AppText>Line: {line}</AppText>
			<AppText>Series: {amdSeries || ultraSeries}</AppText>
			<AppText>Generation: {generation}</AppText>
		</Body>
	)
}