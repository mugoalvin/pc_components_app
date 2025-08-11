import { ReactNode } from "react";
import { View } from "react-native";
import AppText from "../../texts/appText";

interface BottomSheetSectionProps {
	headerText?: string
	BodyComponent: ReactNode
	className?: string
}
export default function BottomSheetSection({ headerText, BodyComponent, className }: BottomSheetSectionProps) {
	return (
		<View className={`gap-2 mb-5 ${className}`}>
			{
				headerText &&
					<AppText bold className="text-2xl mt-3">{headerText}</AppText>
			}
			{BodyComponent}
		</View>
	)
}