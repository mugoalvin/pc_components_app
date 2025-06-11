import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import AppText from '../texts/appText'

interface NewCardProps {
	index?: number
	title?: string
	productCount?: string
	lastUpdated?: string
	onPress?: () => void
}

export default function SeriesOrGenCard({ index, title, productCount, lastUpdated, onPress }: NewCardProps) {
	const theme = useTheme()

	return (
		<>
				{index !== 0 && <Divider bold className='my-2' style={{ backgroundColor: theme.colors.outline }} />}
				<TouchableOpacity activeOpacity={0.4} className='pb-1 justify-center w-full' onPress={onPress}>
					<View className='flex-row justify-between w-full mb-1'>
						<AppText className='text-xl' bold>{title}</AppText>
					</View>
					<AppText bold color={theme.colors.onSurfaceDisabled}>{ productCount || "7 Processors" }</AppText>
					<AppText color={theme.colors.onSurfaceDisabled}>Last Updated: {lastUpdated || "6 days ago"}</AppText>
			</TouchableOpacity>
		</>
	)
}