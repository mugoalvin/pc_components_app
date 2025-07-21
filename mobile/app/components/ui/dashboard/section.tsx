import { ReactNode } from "react"
import { View } from "react-native"

interface DashboardSectionProps {
	HeaderComponent: ReactNode
	BodyComponent: ReactNode
	className?: string
}

export default function DashboardSection({ HeaderComponent, BodyComponent, className }: DashboardSectionProps) {
	return (
		<View className={`gap-2 mb-5 ${className}`}>
			{HeaderComponent}
			{BodyComponent}
		</View>
	)
}