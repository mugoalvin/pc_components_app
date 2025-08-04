import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TouchableNativeFeedback, useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HeaderBackArrow() {
	const theme = useTheme()
	const colorScheme = useColorScheme()
	const navigation = useNavigation()

	return (
		<TouchableNativeFeedback
			onPress={() => navigation.goBack()}
			hitSlop={10}
			background={TouchableNativeFeedback.Ripple(colorScheme === 'light' ? theme.colors.secondary : theme.colors.secondaryContainer, true)}
		>
			<View
				className='w-8 h-7 items-center me-2'
				style={{
					borderRadius: "50%"
				}}
			>
				<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
			</View>
		</TouchableNativeFeedback>
	)
}