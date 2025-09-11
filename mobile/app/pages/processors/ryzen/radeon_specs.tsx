import AppText from "@/app/components/texts/appText"
import SubTitle from "@/app/components/texts/subTitle"
import { View } from "react-native"
import { useTheme } from "react-native-paper"
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated"
import { FlatGrid } from "react-native-super-grid"
import { Radeon } from "../../../../../packages/interfaces"

interface RadeonSpecificationsProps {
	radeon: Radeon
}

export default function RadeonSpecifications({ radeon }: RadeonSpecificationsProps) {
	const theme = useTheme()

	const dataInCard = [
		{
			title: "V-RAM",
			info: radeon.max_memory_size
		},
		{
			title: "Memory Type",
			info: radeon.memory_type
		},
		{
			title: "Boost Frequency",
			info: radeon.boost_frequency?.replace("Up to", '')
		}
	]

	return (
		<View className='mb-5'>
			<SubTitle bold enteringAnimation={FadeInRight.springify().delay(1600)}>Specifications</SubTitle>

			<FlatGrid
				data={dataInCard}
				renderItem={({ item, index }) =>
					<Animated.View className='p-3 rounded-lg justify-between min-h-[60]' entering={FadeInDown.duration(500).delay(1900 + (index + 1) * 200)} style={{ backgroundColor: theme.colors.elevation.level2 }}>
						<AppText className='text-xl text-right' color={theme.colors.onSurfaceDisabled}>{item.title}</AppText>
						<AppText className='text-5xl text-center'>{item.info}</AppText>
					</Animated.View>
				}
				itemDimension={150}
			/>
		</View>
	)
}