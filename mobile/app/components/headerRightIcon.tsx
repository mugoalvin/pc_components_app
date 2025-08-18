import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

interface HeaderRightIconProps {
	iconName?: string;
	onPressFunction?: () => void;
}

export default function HeaderRightIcon({ iconName, onPressFunction }: HeaderRightIconProps) {
	const theme = useTheme()

	return (
		<TouchableOpacity className='w-10 h-10 items-center justify-center' onPress={onPressFunction}>
			{/* @ts-ignore */}
			<Ionicons name={iconName || 'ellipsis-vertical'} size={20} color={theme.colors.onBackground} />
		</TouchableOpacity>
	)
}