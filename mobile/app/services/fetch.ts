import axios from "axios";
import Constants from "expo-constants";
import { DatabaseTables } from "../../../packages/types";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

export async function getTableRowCount(table: DatabaseTables) {
	try {
		const res = await axios.post(`${apiDomain}/database/shared_requests/getCount`, { table })
		return res.data
	}
	catch (error: any) {
		throw error
	}
}


export async function getTableData(table: DatabaseTables) {
	try {
		const res = await axios.post(`${apiDomain}/database/shared_requests/getData`, { table })
		return res.data
	}
	catch (error: any) {
		throw error
	}
}

export async function getLatestData(table: DatabaseTables) {
	try {
		const res = await axios.post(`${apiDomain}/database/shared_requests/getLatest`, { table, numberOfProducts: 2 })
		return res.data
	}
	catch (error: any) {
		throw error
	}
}

export default null