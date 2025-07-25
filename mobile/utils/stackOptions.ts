import { router } from "expo-router"
import { ColorSchemeName } from "react-native"
import { ProductBrandFilter } from "./types"

export function getScreenOptions(theme: any, colorScheme: ColorSchemeName) {
	return {
		headerShown: true,
		headerShadowVisible: false,
		headerStyle: {
			// backgroundColor: colorScheme === 'dark' ? theme.colors.surface : theme.colors.onSecondaryContainer
			// backgroundColor: theme.colors.secondaryContainer
			backgroundColor: colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background
		},
		headerTitleStyle: {
			fontSize: theme.fonts.displaySmall.fontSize,
			fontFamily: 'Zain_800ExtraBold',
			color: theme.colors.onBackground
		},
		headerTitleAlign: 'left' as const,

		gestureEnabled: true,
		// animation: "slide_from_right" as const,
		// animation: "ios_from_right" as const,
	}
}

export const openPage = (categoryType: ProductBrandFilter) => router.push({
	pathname: "/pages/[...filters]",
	// @ts-ignore
	params: categoryType
})