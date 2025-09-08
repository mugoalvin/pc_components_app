import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import AnimatedNumbers from 'react-native-animated-numbers'
import { Pressable } from 'react-native-gesture-handler'
import { Divider, useTheme } from 'react-native-paper'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import AppText from '../texts/appText'

interface NewCardProps {
	index?: number
	title?: string
	productCount?: string
	lastUpdated?: string
	series?: string
	onPress?: () => void
}

export default function ProductOverviewCard({ index, title, series, productCount, lastUpdated, onPress }: NewCardProps) {
	const theme = useTheme()
	const [countToDisplay, setCountToDisplay] = useState<number>(0)

	useEffect(() => {
		const target = Number(productCount?.split(' ')[0])
		setTimeout(() => setCountToDisplay(target), 100)
	}, [productCount])

	return (
		<>
			{index !== 0 && <Divider style={{ backgroundColor: theme.colors.outline }} />}
			<Animated.View entering={FadeInLeft.duration(500).delay(100 * index!)}>
				<Pressable
					onPress={onPress}
					android_ripple={{
						color: theme.colors.secondaryContainer,
					}}
				>
					{
						lastUpdated !== 'Not Found'
							?
							<View className='flex-row gap-3 items-center'>
								<View className='min-w-[12%] aspect-square items-center justify-center'>
									<AnimatedNumbers
										animateToNumber={countToDisplay}
										animationDuration={2000}
										fontStyle={{ fontSize: 40, fontWeight: 'bold', color: theme.colors.primary }}
									/>
								</View>

								<Divider style={{ width: 1, height: '70%' }} />
								<View className='my-2'>
									<View className='mt-2 flex-row justify-between w-full'>
										<AppText className='text-xl' bold>{title}</AppText>
									</View>
									<AppText color={theme.colors.onSurfaceDisabled}>Last Updated: {lastUpdated}</AppText>
								</View>
							</View>
							:
							<View className='my-2'>
								<View className='mt-2 flex-row justify-between w-full'>
									<AppText className='text-xl' bold>{title}</AppText>
								</View>
							</View>
					}

				</Pressable>
			</Animated.View>
		</>
	)
}