import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { IconButton, useTheme } from "react-native-paper";

export default function HeaderBackArrow() {
	const theme = useTheme()
	const navigation = useNavigation()

	return (
		<IconButton
			size={16}
			icon={() =>
				<Ionicons name='chevron-back' size={16} color={theme.colors.onBackground} />
			}
			onPress={() => navigation.goBack()}
			hitSlop={10}
		/>
	)
}