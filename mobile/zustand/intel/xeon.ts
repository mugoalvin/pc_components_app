import { create } from "zustand";
import { IntelXeon } from "../../../packages/interfaces";

interface IntelXeonState {
	xeon_inventory: IntelXeon[]
	xeon_inventory_count: number
	update_xeon_inventory: (xeon_processors: IntelXeon[]) => void
	update_xeon_inventory_count: (count: number) => void
}

const useIntelXeonStore = create<IntelXeonState>(set => ({
	xeon_inventory: [],
	xeon_inventory_count: 0,
	update_xeon_inventory: (xeons: IntelXeon[]) => 
		set({ xeon_inventory: xeons }),

	update_xeon_inventory_count: (count: number) =>
		set({ xeon_inventory_count: count })
}))

export default useIntelXeonStore