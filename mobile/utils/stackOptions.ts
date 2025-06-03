export const screenOptions = {
	headerShown: false,
	headerStyle: {
		// backgroundColor: colorScheme == 'dark' ? theme.colors.surface : theme.colors.onSecondaryContainer
	},
	headerTitleStyle: {
		// fontSize: theme.fonts.titleLarge.fontSize,
		fontFamily: 'DefaultCustomFont-Bold',
	},
	headerTitleAlign: 'center' as const,
	// headerTintColor: colorScheme == 'dark' ? theme.colors.onSurface : theme.colors.secondaryContainer,
	// headerTintColor: theme.colors.secondaryContainer,

	gestureEnabled: true,
	// animation: "slide_from_right" as const,
	animation: "ios_from_right" as const,
	headerShadowVisible: true,
}