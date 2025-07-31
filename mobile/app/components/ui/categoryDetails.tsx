import React from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AppText from '../texts/appText';

import { MaterialIcons } from '@expo/vector-icons';


interface CategoryDetailsProps {
	categoryName?: string
	description?: string
	icon?: string
	temporary?: boolean
	onClick?: () => void
}

export default function CategoryDetails({ categoryName, description, icon, onClick, temporary }: CategoryDetailsProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<Pressable
			id={categoryName}
			style={{
				backgroundColor: colorScheme === 'light' ? theme.colors.background : theme.colors.elevation.level1,
				width: "48%",
				aspectRatio: 1,
				elevation: 3
			}}
			className='items-center justify-center rounded-xl'
			onPress={onClick}
			android_ripple={{
				color: theme.colors.secondaryContainer,
			}}
		>
			<>
				<View className='items-center justify-center rounded-xl' style={{ width: 80, aspectRatio: 1 }}>
					<MaterialIcons
						// @ts-expect-error
						name={icon}
						size={50}
						color={theme.colors.onSecondaryContainer}
					/>
				</View>

				<AppText bold className='text-xl'>{categoryName}</AppText>
				<AppText color={theme.colors.onSurfaceDisabled} className='text-center'>{description}</AppText>
			</>
		</Pressable>
	)
}