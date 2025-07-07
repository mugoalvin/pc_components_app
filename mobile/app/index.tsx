import useRadeonStore from "@/zustand/amd/radeon";
import useRyzenStore from "@/zustand/amd/ryzen";
import useIntelArkStore from "@/zustand/intel/ark";
import useIntelCoreStore from "@/zustand/intel/core";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";

import { useEffect, useState } from "react";
import { IntelArk, IntelCore, IntelCoreUltra, Radeon, Ryzen } from "../../packages/interfaces";
import Dashboard from "./pages/dashboard";
import { getTableData } from "./services/fetch";
import { FlatESLint } from "eslint/use-at-your-own-risk";
import { SplashScreen } from "expo-router";
import CustomSplashScreen from "./components/ui/customSplashScreen";


// ===================== Exported Sync Functions =====================

// Ryzen
export async function syncRyzenInventory() {
	try {
		const updateRyzenInventory = useRyzenStore.getState().update_ryzen_inventory;
		const updateRyzenInventoryCount = useRyzenStore.getState().update_ryzen_inventory_count;
		const ryzen = await getTableData("ryzen") as Ryzen[];
		updateRyzenInventory(ryzen);
		updateRyzenInventoryCount(ryzen.length);
	}
	catch (err: any) {
		console.log(err)
	}
}

// Radeon
export async function syncRadeonInventory() {
	const updateRadeonInventory = useRadeonStore.getState().update_radeon_inventory;
	const updateRadeonInventoryCount = useRadeonStore.getState().update_radeon_inventory_count;
	const radeon = await getTableData("radeon") as Radeon[];
	updateRadeonInventory(radeon);
	updateRadeonInventoryCount(radeon.length);
}

// Intel Core
export async function syncIntelCoreInventory() {
	const updateIntelCoreInventory = useIntelCoreStore.getState().update_intel_core_inventory;
	const updateIntelCoreInventoryCount = useIntelCoreStore.getState().update_intel_core_inventory_count;
	const intelCore = await getTableData('core') as IntelCore[];
	updateIntelCoreInventory(intelCore);
	updateIntelCoreInventoryCount(intelCore.length);
}

// Intel Ultra
export async function syncIntelUltraInventory() {
	const updateIntelUltraInventory = useIntelCoreUltraStore.getState().update_intel_ultra_inventory;
	const updateIntelUltraInventoryCount = useIntelCoreUltraStore.getState().update_intel_ultra_inventory_count;
	const intelUltra = await getTableData('ultra') as IntelCoreUltra[];
	updateIntelUltraInventory(intelUltra);
	updateIntelUltraInventoryCount(intelUltra.length);
}

// Intel Ark
export async function syncIntelArkInventory() {
	const updateIntelArkInventory = useIntelArkStore.getState().update_ark_inventory;
	const updateIntelArkInventoryCount = useIntelArkStore.getState().update_ark_inventory_count;
	const intelArk = await getTableData('ark') as IntelArk[];
	updateIntelArkInventory(intelArk);
	updateIntelArkInventoryCount(intelArk.length);
}

export default function Index() {
	useEffect(() => {
		syncRyzenInventory();
		syncRadeonInventory();
		syncIntelCoreInventory();
		syncIntelUltraInventory();
		syncIntelArkInventory();
	}, []);

	// if (!isAllLoaded) return <CustomSplashScreen />
	// return <CustomSplashScreen />
	return <Dashboard />
}