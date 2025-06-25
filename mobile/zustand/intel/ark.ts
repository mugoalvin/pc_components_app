import { create } from 'zustand'
import { IntelArk } from '../../../packages/interfaces'

interface IntelArkState {
	ark_inventory: IntelArk[]
	ark_inventory_count: number
	update_ark_inventory: (graphics: IntelArk[]) => void
	update_ark_inventory_count: (count: number) => void
}

const useIntelArkStore = create<IntelArkState>((set) => ({
	ark_inventory: [],
	ark_inventory_count: 0,
	update_ark_inventory_count: (count) => 
		set({ ark_inventory_count: count }),

	update_ark_inventory: (graphics: IntelArk[]) =>
		set({ ark_inventory: graphics })
}))


export default useIntelArkStore