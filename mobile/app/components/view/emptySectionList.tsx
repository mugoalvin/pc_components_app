import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../texts/appText";

interface EmptySectionListProps {
	isNotScraped?: boolean
}
export default function EmptySectionList({ isNotScraped }: EmptySectionListProps) {
	const theme = useTheme()
	

	return (
		<View className="items-center justify-center" style={{ minHeight: Dimensions.get('window').height/1.3 }}>
			{
				isNotScraped ?
				<>
					<AppText bold className="text-3xl" color={theme.colors.error}>Data Not Found</AppText>
					<AppText className="text-xl">Try sourcing from the web</AppText>
				</>
				:
				<>
					<AppText bold className="text-3xl" color={theme.colors.error}>Connection Error</AppText>
					<AppText className="text-xl">Kindly check connection and try again later</AppText>
				</>
			}
		</View>

	)
}