import Index from '@/app'
import ProductsBrands from '@/app/pages/products_brands'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ProductsBrandModel } from '../../utils/types'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'
import Brand from './brand'
import Products from './products'


const CategoryNavigator = () => {
	const params = useLocalSearchParams() as Partial<ProductsBrandModel>

	// @ts-ignore
	const { product, brand, line, series } = params

	if (!product) return <Index />

	if (product && !brand) return <ProductsBrands />

	if (product && brand && !series) return <Brand />

	if (product && brand && series) return <Products />

	return (
		<Body>
			<AppText>Product: {product}</AppText>
			<AppText>Brand: {brand}</AppText>
			<AppText>Line: {line}</AppText>
			<AppText>Series: {series}</AppText>
		</Body>
	)
}

export default CategoryNavigator