import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { WebView } from 'react-native-webview'

export default function WebViewPage() {
	const navigation = useNavigation()
	const { uri } = useLocalSearchParams()

	useEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	return (
		<WebView
			source={{ uri: uri as string }}
		/>
	)
}