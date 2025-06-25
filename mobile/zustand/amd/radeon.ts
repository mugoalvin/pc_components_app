import { create } from 'zustand'
import { Radeon } from '../../../packages/interfaces'

interface RadeonState {
	radeon_inventory: Radeon[]
	radeon_inventory_count: number
	update_radeon_inventory: (graphics: Radeon[]) => void
	update_radeon_inventory_count: (count: number) => void
}

const useRadeonStore = create<RadeonState>((set) => ({
	radeon_inventory: [],
	radeon_inventory_count: 0,
	update_radeon_inventory_count: (count) => 
		set({ radeon_inventory_count: count }),

	update_radeon_inventory: (graphics: Radeon[]) =>
		set({ radeon_inventory: graphics })
}))


export default useRadeonStore