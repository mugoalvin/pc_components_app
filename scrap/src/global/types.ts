import { AmdScrape } from "../scrapers/amd/types"

export interface MyUrl {
	domain: string
	route: string
	tabIndex?: AmdScrape
}