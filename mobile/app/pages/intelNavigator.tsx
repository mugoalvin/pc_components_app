import { isSet } from "@/utils/functions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import AppText from "../components/texts/appText";
import Body from "../components/ui/body";
import CoreLine from "./intel/core_line";
import CoreProducts from "./intel/core_products";
import UltraLine from "./intel/ultra_line";
import UltraProducts from "./intel/ultra_products";


export default function IntelNavigator() {
	// @ts-expect-error
	const { selectedComponent, brand, line, generation, ultraSeries, ultraTier } = useLocalSearchParams() as Partial<ProductBrandFilter>

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && !isSet(ultraSeries)) return <UltraLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && isSet(ultraSeries)) return <UltraProducts />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '1' && !isSet(generation)) return <CoreLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '1' && isSet(generation)) return <CoreProducts />

	return (
		<Body>
			<AppText>Brand: {brand}</AppText>
			<AppText>Line: {line}</AppText>
			<AppText>Generation: {generation}</AppText>
			<AppText>Ultra Series: {ultraSeries}</AppText>
			<AppText>Ultra Tier: {ultraTier}</AppText>
		</Body>
	)
}