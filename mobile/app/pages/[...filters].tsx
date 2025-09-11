import Index from '@/app/index'
import ProductsBrands from '@/app/pages/products_brands'
import { isSet } from '@/utils/functions'
import { ProductBrandFilter } from '@/utils/types'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

import AppText from '../components/texts/appText'
import Body from '../components/ui/body'
import RadeonNavigator from './gpu/radeon/radeon_navigator'
import RadeonProducts from './gpu/radeon/radeon_products'
import IntelLines from './processors/intel/intel_lines'
import IntelNavigator from './processors/intel/intelNavigator'
import RyzenBrand from './processors/ryzen/ryzen_brand'
import RyzenProducts from './processors/ryzen/ryzen_products'

const routes = [
	{
		condition: (params: any) => !isSet(params.selectedComponent),
		component: <Index />,
	},
	{
		condition: (params: any) => !isSet(params.brand),
		component: <ProductsBrands />,
	},




	// ============================================== AMD ==============================================
	// Ryzen
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '0' &&
			String(params.brand) === '0' &&
			!isSet(params.amdSeries),
		component: <RyzenBrand />,
	},
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '0' &&
			String(params.brand) === '0' &&
			isSet(params.amdSeries),
		component: <RyzenProducts />,
	},

	// Radeon
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '1' &&
			String(params.brand) === '2' &&
			!isSet(params.radeonLine),
		component: <RadeonProducts />,
	},
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '1' &&
			String(params.brand) === '2' &&
			isSet(params.radeonLine),
		component: <RadeonNavigator />,
	},


	// Intel
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '0' &&
			String(params.brand) === '1' &&
			!isSet(params.line),
		component: <IntelLines />,
	},
	{
		condition: (params: any) =>
			isSet(params.amdSeries) || isSet(params.ultraSeries) || isSet(params.line),
		component: <IntelNavigator />,
	},
	// Add more routes as needed
]

export default function CategoryNavigator() {
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>

	for (const route of routes) {
		if (route.condition(params)) {
			return route.component
		}
	}

	// Default fallback
	return (
		<Body>
			<AppText>Product: {params.selectedComponent}</AppText>
			<AppText>Brand: {params.brand}</AppText>
			<AppText>Line: {params.line}</AppText>
			<AppText>Series: {params.amdSeries || params.ultraSeries}</AppText>
			<AppText>Generation: {params.generation}</AppText>
		</Body>
	)
}