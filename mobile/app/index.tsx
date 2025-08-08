import { SnackbarParams } from "@/context/SnackbarContext";
import useRadeonStore from "@/zustand/amd/radeon";
import useRyzenStore from "@/zustand/amd/ryzen";
import useIntelArkStore from "@/zustand/intel/ark";
import useIntelCoreStore from "@/zustand/intel/core";
import useIntelCoreUltraStore from "@/zustand/intel/ultra";
import useNvidiaGeforceStore from "@/zustand/nvidia/geforce";
import { IntelArk, IntelCore, IntelCoreUltra, NvidiaGeForce, Radeon, Ryzen } from "../../packages/interfaces";
import Dashboard from "./pages/dashboard";
import { getTableData, getTableRowCount } from "./services/fetch";


// ===================== Exported Sync Functions =====================

// Ryzen
export async function syncRyzenInventoryCount() {
	try {
		const updateRyzenInventoryCount = useRyzenStore.getState().update_ryzen_inventory_count;
		const ryzenCount = await getTableRowCount("ryzen");
		updateRyzenInventoryCount(ryzenCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncRyzenInventory() {
	try {
		const updateRyzenInventory = useRyzenStore.getState().update_ryzen_inventory;
		const updateRyzenInventoryCount = useRyzenStore.getState().update_ryzen_inventory_count;
		const ryzen = await getTableData("ryzen") as Ryzen[];
		updateRyzenInventory(ryzen);
		updateRyzenInventoryCount(ryzen.length);
	}
	catch (err: any) {
		throw err
	}
}

// Radeon
export async function syncRadeonInventoryCount() {
	try {
		const updateRadeonInventoryCount = useRadeonStore.getState().update_radeon_inventory_count;
		const radeonCount = await getTableRowCount("radeon")
		updateRadeonInventoryCount(radeonCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncRadeonInventory() {
	try {
		const updateRadeonInventory = useRadeonStore.getState().update_radeon_inventory;
		const updateRadeonInventoryCount = useRadeonStore.getState().update_radeon_inventory_count;
		const radeon = await getTableData("radeon") as Radeon[];
		updateRadeonInventory(radeon);
		updateRadeonInventoryCount(radeon.length);
	}
	catch (err: any) {
		throw err
	}
}

// Intel Core
export async function syncIntelCoreInventoryCount() {
	try {
		const updateIntelCoreInventoryCount = useIntelCoreStore.getState().update_intel_core_inventory_count;
		const intelCoreCount = await getTableRowCount('core');
		updateIntelCoreInventoryCount(intelCoreCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncIntelCoreInventory() {
	try {
		const updateIntelCoreInventory = useIntelCoreStore.getState().update_intel_core_inventory;
		const updateIntelCoreInventoryCount = useIntelCoreStore.getState().update_intel_core_inventory_count;
		const intelCore = await getTableData('core') as IntelCore[];
		updateIntelCoreInventory(intelCore);
		updateIntelCoreInventoryCount(intelCore.length);
	}
	catch (err: any) {
		throw err
	}
}

// Intel Ultra
export async function syncIntelUltraInventoryCount() {
	try {
		const updateIntelUltraInventoryCount = useIntelCoreUltraStore.getState().update_intel_ultra_inventory_count;
		const intelUltraCount = await getTableRowCount('ultra');
		updateIntelUltraInventoryCount(intelUltraCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncIntelUltraInventory() {
	try {
		const updateIntelUltraInventory = useIntelCoreUltraStore.getState().update_intel_ultra_inventory;
		const updateIntelUltraInventoryCount = useIntelCoreUltraStore.getState().update_intel_ultra_inventory_count;
		const intelUltra = await getTableData('ultra') as IntelCoreUltra[];
		updateIntelUltraInventory(intelUltra);
		updateIntelUltraInventoryCount(intelUltra.length);
	}
	catch (err: any) {
		throw err
	}
}

// Intel Ark
export async function syncIntelArkInventoryCount() {
	try {
		const updateIntelArkInventoryCount = useIntelArkStore.getState().update_ark_inventory_count;
		const intelArkCount = await getTableRowCount('ark');
		updateIntelArkInventoryCount(intelArkCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncIntelArkInventory() {
	try {
		const updateIntelArkInventory = useIntelArkStore.getState().update_ark_inventory;
		const updateIntelArkInventoryCount = useIntelArkStore.getState().update_ark_inventory_count;
		const intelArk = await getTableData('ark') as IntelArk[];
		updateIntelArkInventory(intelArk);
		updateIntelArkInventoryCount(intelArk.length);
	}
	catch (err: any) {
		throw err
	}
}


// Nvidia Geforce
export async function syncNvidiaGeforceInventoryCount() {
	try {
		const updateGeforceInventoryCount = useNvidiaGeforceStore.getState().update_geforce_inventory_count
		const geforceGraphicsCount = await getTableRowCount("geforce");
		updateGeforceInventoryCount(geforceGraphicsCount);
	}
	catch (err: any) {
		throw err
	}
}
export async function syncNvidiaGeforceInventory() {
	try {
		const updateGeforceInventory = useNvidiaGeforceStore.getState().update_geforce_inventory
		const updateGeforceInventoryCount = useNvidiaGeforceStore.getState().update_geforce_inventory_count
		const geforceGraphics = await getTableData("geforce") as NvidiaGeForce[];
		updateGeforceInventory(geforceGraphics);
		updateGeforceInventoryCount(geforceGraphics.length);
	}
	catch (err: any) {
		throw err
	}
}

export default function Index() {
	// if (!isAllLoaded) return <CustomSplashScreen />
	return <Dashboard />
}