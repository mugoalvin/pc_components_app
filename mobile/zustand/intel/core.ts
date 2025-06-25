import { create } from 'zustand'
import { IntelCore } from '../../../packages/interfaces'

interface IntelCoreState {
	intel_core_inventory: IntelCore[]
	intel_core_inventory_count: number
	update_intel_core_inventory: (processors: IntelCore[]) => void
	update_intel_core_inventory_count: (count: number) => void
}

const useIntelCoreStore = create<IntelCoreState>((set) => ({
	intel_core_inventory: [],
	intel_core_inventory_count: 0,
	update_intel_core_inventory_count: (count) =>
		set({ intel_core_inventory_count: count }),

	update_intel_core_inventory: (processors: IntelCore[]) =>
		set({ intel_core_inventory: processors })
}))


export default useIntelCoreStore