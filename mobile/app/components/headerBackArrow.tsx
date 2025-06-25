import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export default function HeaderBackArrow() {
	const theme = useTheme()
	const navigation = useNavigation()

	return (
		<TouchableOpacity className='w-10 h-10 justify-center' onPress={() => navigation.goBack()} >
			<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
		</TouchableOpacity>
	)
}