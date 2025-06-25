import axios from "axios";
import Constants from "expo-constants";
import { DatabaseTables } from "../../../packages/types";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

// export async function getTableRowCount(): Promise<number> {
export async function getTableRowCount(table: DatabaseTables) {
	const res = await axios.post(`${ apiDomain }/database/processors/getCount`, { table })
	return res.data
}


export async function getTableData(table: DatabaseTables) {
	const res = await axios.post(`${ apiDomain }/database/processors/getData`, { table })
	return res.data
}

export default null