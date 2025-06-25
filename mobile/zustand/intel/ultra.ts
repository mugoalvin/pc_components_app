import { create } from 'zustand'
import { IntelCoreUltra } from '../../../packages/interfaces'

interface IntelCoreUltraState {
	intel_ultra_inventory: IntelCoreUltra[]
	intel_ultra_inventory_count: number
	update_intel_ultra_inventory: (processors: IntelCoreUltra[]) => void
	update_intel_ultra_inventory_count: (count: number) => void
}

const useIntelCoreUltraStore = create<IntelCoreUltraState>((set) => ({
	intel_ultra_inventory: [],
	intel_ultra_inventory_count: 0,
	update_intel_ultra_inventory_count: (count) => 
		set({ intel_ultra_inventory_count: count }),
		
	update_intel_ultra_inventory: (processors: IntelCoreUltra[]) => {
		set({ intel_ultra_inventory: processors })
		set({ intel_ultra_inventory_count: processors.length })
	}
}))


export default useIntelCoreUltraStore