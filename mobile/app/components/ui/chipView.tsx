import { ReactNode } from "react";
import { View } from "react-native";
import ProgressBarCustom from "./customProgressBar";

interface ChipViewProps {
	children: ReactNode
	progress?: number
}

export default function ChipView({ children, progress }: ChipViewProps) {
	return (
		<View className="gap-2">
			<View className="flex-row gap-2 flex-wrap">
				{children}
			</View>
			<ProgressBarCustom progress={progress} />
		</View>
	)
}