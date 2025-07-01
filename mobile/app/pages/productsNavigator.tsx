import { isSet } from "@/utils/functions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import CoreLine from "./intel/core_line";
import UltraLine from "./intel/ultra_line";
import RyzenProducts from "./ryzen/ryzen_products";
import UltraProducts from "./intel/ultra_products";


export default function ProductsNavigator() {
	// @ts-expect-error
	const { selectedComponent, brand, amdSeries, line, ultraSeries, ultraTier } = useLocalSearchParams() as Partial<ProductBrandFilter>

	if (String(selectedComponent) === '0' && String(brand) === '0' && isSet(amdSeries)) return <RyzenProducts />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && !isSet(ultraSeries)) return <UltraLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && isSet(ultraSeries)) return <UltraProducts />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '1') return <CoreLine />

	return (
		<Body>
			<AppText>Brand: {brand}</AppText>
			<AppText>Line: {line}</AppText>
			<AppText>Ultra Series: {ultraSeries}</AppText>
			<AppText>Ultra Tier: {ultraTier}</AppText>
		</Body>
	)
} 