import { getScreenOptions } from '@/utils/stackOptions';
import { JosefinSans_400Regular, JosefinSans_700Bold, useFonts } from '@expo-google-fonts/josefin-sans';
import { Zain_400Regular, Zain_800ExtraBold } from "@expo-google-fonts/zain";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Stack } from 'expo-router';
import { View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import '../global.css';
import * as Updates from 'expo-updates'
import { useEffect } from 'react';

export default function App() {
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync()
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
		} catch (error) {
			alert(`Error fetching latest expo update: ${error}`)
		}
	}


	const colorScheme = useColorScheme()
	const { theme, resetTheme, updateTheme } = useMaterial3Theme({ sourceColor: "#ab8191", fallbackSourceColor: "#088204" })


	const finalTheme = {
		...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
		colors: {
			...(colorScheme === 'dark' ? theme.dark : theme.light)
		}
	};

	const [fontLoaded] = useFonts({
		JosefinSans_400Regular, JosefinSans_700Bold, Zain_400Regular, Zain_800ExtraBold
	})

	// useEffect(() => {
	// 	onFetchUpdateAsync()
	// }, [])

	if (!fontLoaded) {
		return (
			<View className='flex-1 items-center justify-center'>
				<ActivityIndicator theme={finalTheme} />
			</View>
		)
	}

	return (
		<ThemeContext.Provider value={{ resetTheme, updateTheme }}>
			<PaperProvider theme={finalTheme}>
				<GestureHandlerRootView>
					<Stack screenOptions={getScreenOptions(finalTheme)}>
						<Stack.Screen name='index'/>
					</Stack>
				</GestureHandlerRootView>
			</PaperProvider>
		</ThemeContext.Provider>
	);
}