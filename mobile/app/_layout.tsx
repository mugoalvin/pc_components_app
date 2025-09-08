import { SnackbarProvider } from '@/context/SnackbarContext';
import { getScreenOptions } from '@/utils/stackOptions';
import { JosefinSans_400Regular, JosefinSans_700Bold, useFonts } from '@expo-google-fonts/josefin-sans';
import { Zain_400Regular, Zain_800ExtraBold } from "@expo-google-fonts/zain";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Stack } from 'expo-router';
import { View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { WebSocketProvider } from '../context/WebsockerContext';
import '../global.css';

export default function App() {
    const colorScheme = useColorScheme()
    const { theme, resetTheme, updateTheme } = useMaterial3Theme()
    const [fontLoaded] = useFonts({
        JosefinSans_400Regular, JosefinSans_700Bold, Zain_400Regular, Zain_800ExtraBold
    })

    const finalTheme = {
        ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
        colors: {
            ...(colorScheme === 'dark' ? theme.dark : theme.light)
        }
    }

    if (!fontLoaded) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator theme={finalTheme} />
            </View>
        );
    }

    return (
        <ThemeContext.Provider value={{ resetTheme, updateTheme }}>
            <PaperProvider theme={finalTheme}>
                <WebSocketProvider>
                    <SnackbarProvider>
                        <GestureHandlerRootView>
                            <Stack screenOptions={getScreenOptions(finalTheme, colorScheme)}>
                                <Stack.Screen name='index' />
                            </Stack>
                        </GestureHandlerRootView>
                    </SnackbarProvider>
                </WebSocketProvider>
            </PaperProvider>
        </ThemeContext.Provider>
    );
}