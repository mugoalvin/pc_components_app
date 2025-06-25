import { ComponentTypeEnum } from "@/utils/types";
import { GraphicsBrandEnum, ProcessorsEnum } from "../../../../packages/types";
import ChipCustom from "../buttons/chips";
import { View } from "react-native";

interface FilterChipsProps {
	product?: ComponentTypeEnum
	brand?: ProcessorsEnum | GraphicsBrandEnum
}

export default function FilterChips({ product, brand }: FilterChipsProps) {

	// If Processors ; AMD
	if (String(product) === "0" && String(brand) === "0") {
		return (
			<View className='flex-row gap-2 flex-wrap'>
				<ChipCustom chipText='All' />
				<ChipCustom chipText='Desktop' icon="monitor" />
				<ChipCustom chipText='Laptop' icon="laptop" />
			</View>
		)
	}


	// If Processors ; Intel
	if (String(product) === "0" && String(brand) === "1") {
		return (
			<View className='flex-row gap-2 flex-wrap'>
				<ChipCustom chipText='All' />
				<ChipCustom chipText='Core i9'/>
				<ChipCustom chipText='Core i7' />
				<ChipCustom chipText='Core i5' />
				<ChipCustom chipText='Core i3' />
			</View>
		)
	}
}