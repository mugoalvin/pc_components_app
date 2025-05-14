export enum AmdScrape { Ryzen = 1 , Radeon, Something }

export interface MyUrl {
	domain: string
	route: string
	tabIndex?: AmdScrape
}