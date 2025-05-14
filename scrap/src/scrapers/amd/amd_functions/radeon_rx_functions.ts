import { MyUrl } from "../../../global/types";
import { Radeon } from "../types";
import { getAmdProducts } from './shared_functions'

export async function getAmdRadeonRx(url: MyUrl): Promise<Radeon[]> {
	return await getAmdProducts(url) as Radeon[]
}


export function validateRadeonRxProcessors(radeonRxGraphicsCards: Radeon[]): Radeon[] {
	return radeonRxGraphicsCards.filter(radeon => {
		return Object.values(radeon).map(value => {
			value !== null
		})
	})
}