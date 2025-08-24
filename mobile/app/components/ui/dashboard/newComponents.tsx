import useRyzenStore from "@/zustand/amd/ryzen";
import useIntelCoreStore from "@/zustand/intel/core";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { syncIntelCoreInventory, syncIntelUltraInventory, syncRyzenInventory } from '../../../index';
import NewParts from "./newParts";

export default function NewComponents() {
	const colorScheme = useColorScheme()
	const [newComponents, setNewComponents] = useState<any[]>([])
	const ryzenInventory = useRyzenStore(state => state.ryzen_inventory)
	const coreInventory = useIntelCoreStore(state => state.intel_core_inventory)
	const ultraInventory = useIntelCoreUltraStore(state => state.intel_ultra_inventory)

	function shuffleArray(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	useEffect(() => {
		syncRyzenInventory()
		syncIntelCoreInventory()
		syncIntelUltraInventory()
	}, [])

	useEffect(() => {
		const latestRyzen = ryzenInventory.sort((a, b) =>
			new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())
			.slice(0, 2);

		const latestCore = coreInventory.sort((a, b) =>
			new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())
			.slice(0, 2);

		const latestUltra = ultraInventory.sort((a, b) =>
			new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())
			.slice(0, 2);

		let latestComponents: any[] = [...latestUltra, ...latestRyzen, ...latestCore]

		setNewComponents(
			shuffleArray(latestComponents)
		)

	}, [ryzenInventory, coreInventory, ultraInventory])

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
			{
				newComponents.map((component, index) =>
					<NewParts
						key={index}
						index={index}
						title={component.name}
						description={`${component.max_turbo_frequency || component.max_boost_clock}`}
						image={
							component.image ||
							(
								colorScheme === 'light'
									? "https://i0.wp.com/chemmatcars.uchicago.edu/wp-content/uploads/2021/03/default-placeholder-image-1024x1024-1.png?ssl=1"
									: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0V1a7P8AYy3QBSO1AgldcqV9H37AtK3_aQ&s"
							)
						}
						onPress={() =>
							router.push({
								pathname: '/pages/product_details',
								params: { processor: JSON.stringify(component) }
							})
						}
					/>
				)
			}
		</ScrollView>
	)
}