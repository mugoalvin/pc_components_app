import { getScreenOptions } from '@/utils/stackOptions';
import { JosefinSans_400Regular, JosefinSans_700Bold, useFonts } from '@expo-google-fonts/josefin-sans';
import { Zain_400Regular, Zain_800ExtraBold } from "@expo-google-fonts/zain";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { NativeModules, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import '../global.css';

export default function App() {
    const { MaterialTheme } = NativeModules;
    const [primaryColor, setPrimaryColor] = useState<string>();

    useEffect(() => {
        const loadPrimaryColor = async () => {
            if (MaterialTheme && typeof MaterialTheme.getPrimaryColor === 'function') {
                try {
                    const color = await MaterialTheme.getPrimaryColor();
                    const hexColor = '#' + (color >>> 0).toString(16).padStart(8, "0").slice(2)
                    console.log("Primary Color Type: ", hexColor);
                    setPrimaryColor(hexColor);
                    updateTheme(hexColor)
                } catch (e: any) {
                    console.warn("Failed to load primary color:", e.message);
                    setPrimaryColor("#ab8191"); // fallback
                }
            } else {
                console.warn("MaterialTheme native module not available, using fallback color.");
                setPrimaryColor("#088204"); // fallback
            }
        };
        loadPrimaryColor();
    }, []);

    const colorScheme = useColorScheme();

    // Only call useMaterial3Theme when primaryColor is available
    const { theme, resetTheme, updateTheme } = useMaterial3Theme({
        sourceColor: primaryColor,
        fallbackSourceColor: "#088204"
    });

    const finalTheme = {
        ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
        colors: {
            ...(colorScheme === 'dark' ? theme.dark : theme.light)
        }
    };

    const [fontLoaded] = useFonts({
        JosefinSans_400Regular, JosefinSans_700Bold, Zain_400Regular, Zain_800ExtraBold
    });

    if (!fontLoaded || !primaryColor) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator theme={finalTheme} />
            </View>
        );
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