import axios from "axios";
import Constants from 'expo-constants';
import { Alert } from "react-native";

const apiDomain = Constants.expoConfig?.extra?.API_DOMAIN ?? ''

export async function makeApiRequestToScrapeGeforce() {
	try {
		const res = await axios.post(`${apiDomain}/scrape/geforce`)
		Alert.alert("Success", res.data.success)
	}
	catch(err: any) {
		Alert.alert('Error', err.errorMsg)
	}
}


export async function makeApiRequestToScrapeArk(switchIsBtnPressed: () => void) {
	switchIsBtnPressed()
	axios.post(`${apiDomain}/scrape/ark`)
		.then(res => {
			Alert.alert("Success", res.data.success)
		})
		.catch(err => {
			Alert.alert("Error", err.errorMsg)
		})
	
	switchIsBtnPressed()
}