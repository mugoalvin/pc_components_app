import { View } from "react-native";
import { FadeInDown, FadeInRight } from "react-native-reanimated";
import AppText from "../../texts/appText";
import SubTitle from "../../texts/subTitle";

interface RyzenDescriptionProps {
	description: string
}

export default function RyzenDescription({ description }: RyzenDescriptionProps) {
	return (
		<View className="my-10 gap-2">
			<SubTitle enteringAnimation={FadeInRight.springify().delay(1000)} bold>Description</SubTitle>
			<AppText className="text-xl" enteringAnimation={FadeInDown.delay(1400)}>{description}</AppText>
		</View>
	)
}