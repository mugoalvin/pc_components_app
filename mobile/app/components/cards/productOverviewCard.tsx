import React from 'react'
import { View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { Divider, useTheme } from 'react-native-paper'
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

	return (
		<>
			{index !== 0 && <Divider style={{ backgroundColor: theme.colors.outline }} />}
			<Pressable
				onPress={onPress}
				android_ripple={{
					color: theme.colors.secondaryContainer,
				}}
			>
				<View className='my-2'>
					<View className='mt-2 flex-row justify-between w-full'>
						<AppText className='text-xl' bold>{title}</AppText>
					</View>
					<AppText bold color={theme.colors.onSurfaceDisabled}>{productCount || "7 Processors"}</AppText>
					<AppText color={theme.colors.onSurfaceDisabled}>Last Updated: {lastUpdated || "6 days ago"}</AppText>
				</View>
			</Pressable>
		</>
	)
}