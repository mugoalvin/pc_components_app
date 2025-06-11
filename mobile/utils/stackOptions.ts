import { ProductsBrandModel } from "./types"
import { router } from "expo-router"

export function getScreenOptions(theme: any) {
	return {
		headerShown: true,
		headerShadowVisible: false,
		headerStyle: {
			// backgroundColor: colorScheme === 'dark' ? finalTheme.colors.surface : finalTheme.colors.onSecondaryContainer
			backgroundColor: theme.colors.background
		},
		headerTitleStyle: {
			fontSize: theme.fonts.displaySmall.fontSize,
			fontFamily: 'Zain_800ExtraBold',
			color: theme.colors.onBackground
		},
		headerTitleAlign: 'left' as const,
		// headerTintColor: colorScheme === 'dark' ? theme.colors.onSurface : theme.colors.secondaryContainer,
		// headerTintColor: theme.colors.secondaryContainer,

		gestureEnabled: true,
		// animation: "slide_from_right" as const,
		// animation: "ios_from_right" as const,
	}
}

export const openPage = (categoryType: ProductsBrandModel) => router.push({
	pathname: "/pages/[...filters]",
	// @ts-ignore
	params: categoryType
})