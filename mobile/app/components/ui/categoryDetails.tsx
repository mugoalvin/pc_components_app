import React from 'react';
import { TouchableOpacity, View } from 'react-native';
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

	return (
		<TouchableOpacity
			id={categoryName}
			style={{
				backgroundColor: theme.colors.elevation.level1,
				width: "48%",
				aspectRatio: 1
			}}
			className='items-center justify-center rounded-xl'
			activeOpacity={3}
			onPress={onClick}
		>
			<>
				{temporary && <AppText className='text-xl' color={theme.colors.error}>Temporary Card</AppText>}
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
		</TouchableOpacity>
	)
}