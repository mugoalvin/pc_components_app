import { isSet } from "@/utils/functions";
import { ProductBrandFilter } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import CoreLine from "./core_line";
import CoreProducts from "./core_products";
import UltraLine from "./ultra_line";
import UltraProducts from "./ultra_products";
import XeonLine from "./xeon_line";
import XeonProducts from "./xeon_products";
import Body from "@/app/components/ui/body";
import AppText from "@/app/components/texts/appText";


export default function IntelNavigator() {
	const { selectedComponent, brand, line, generation, ultraSeries, ultraTier, xeonSeries } = useLocalSearchParams() as Partial<ProductBrandFilter | any>

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && !isSet(ultraSeries)) return <UltraLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '0' && isSet(ultraSeries)) return <UltraProducts />


	// Intel Core
	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '1' && !isSet(generation)) return <CoreLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '1' && isSet(generation)) return <CoreProducts />

	// Intel Xeon
	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '3' && !isSet(xeonSeries)) return <XeonLine />

	if (String(selectedComponent) === '0' && String(brand) === '1' && String(line) === '3' && isSet(xeonSeries)) return <XeonProducts />


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