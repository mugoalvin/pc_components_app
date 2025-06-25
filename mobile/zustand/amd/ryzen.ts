import { create } from 'zustand'
import { Ryzen } from '../../../packages/interfaces'

interface RyzenState {
	ryzen_inventory: Ryzen[]
	ryzen_inventory_count: number
	update_ryzen_inventory: (processors: Ryzen[]) => void
	update_ryzen_inventory_count: (count: number) => void
}

const useRyzenStore = create<RyzenState>((set) => ({
	ryzen_inventory: [],
	ryzen_inventory_count: 0,
	update_ryzen_inventory_count: (count) => 
		set({ ryzen_inventory_count: count }),

	update_ryzen_inventory: (processors: Ryzen[]) =>
		set({ ryzen_inventory: processors })
}))


export default useRyzenStore