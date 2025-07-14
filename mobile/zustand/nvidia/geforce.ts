import {NvidiaGeForce} from "../../../packages/interfaces";
import {create} from "zustand";

interface NvidiaGeForceState {
		geforce_inventory: NvidiaGeForce[]
		geforce_inventory_count: number
		update_geforce_inventory: (graphics: NvidiaGeForce[]) => void
		update_geforce_inventory_count: (count: number) => void
}

const useNvidiaGeforceStore = create<NvidiaGeForceState>((set) => ({
		geforce_inventory: [],
		geforce_inventory_count: 0,
		update_geforce_inventory_count: (count) =>
				set({ geforce_inventory_count: count }),

		update_geforce_inventory: (graphics: NvidiaGeForce[]) =>
				set({ geforce_inventory: graphics })
}))

export default useNvidiaGeforceStore