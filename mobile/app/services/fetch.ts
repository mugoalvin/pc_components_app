import axios from "axios";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { DatabaseTables } from "../../../packages/types";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

export async function getTableRowCount(table: DatabaseTables) {
	try {
		const res = await axios.post(`${ apiDomain }/database/processors/getCount`, { table })
		return res.data
	}
	catch(error: any) {
		Alert.alert("Error getting table row count", error.errorMsg || error.message)
	}
}


export async function getTableData(table: DatabaseTables) {
	try {
		const res = await axios.post(`${ apiDomain }/database/processors/getData`, { table })
		return res.data
	}
	catch (error: any) {
		Alert.alert(`Error getting ${table} table data`, error.errorMsg || error.message)
	}
}

export default null