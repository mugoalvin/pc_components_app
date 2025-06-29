import { isSet } from "@/utils/functions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import RyzenProducts from "./products/ryzen_products";


export default function ProductsNavigator() {
	// @ts-expect-error
	const { selectedComponent, brand, amdSeries } = useLocalSearchParams() as Partial<ProductBrandFilter>

	if (String(selectedComponent) === '0' && String(brand) === '0' && isSet(amdSeries)) return <RyzenProducts />
}