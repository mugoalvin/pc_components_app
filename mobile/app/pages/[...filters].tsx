import Index from '@/app'
import ProductsBrands from '@/app/pages/products_brands'
import { isSet } from '@/utils/functions'
import { ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'
import IntelLines from './intel/intelLines'
import ProductDetails from './product_details'
import ProductsNavigator from './productsNavigator'
import RyzenBrand from './ryzen/ryzen_brand'


export default function CategoryNavigator() {
	const params = useLocalSearchParams() as Partial<ProductBrandFilter>

	// @ts-ignore
	const { selectedComponent, brand, line, amdSeries, ultraSeries, generation } = params

	if (!isSet(selectedComponent)) return <Index />

	if (!isSet(brand)) return <ProductsBrands />

	if (String(selectedComponent) === "0" && String(brand) === '0' && !isSet(amdSeries)) return <RyzenBrand />

	if (String(selectedComponent) === "0" && String(brand) === "1" && !isSet(line)) return <IntelLines />

	if (isSet(amdSeries) || isSet(ultraSeries) || isSet(line)) return <ProductsNavigator />

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