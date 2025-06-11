import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import ImageCust from '../images/imageCust'
import AppText from '../texts/appText'

interface CategoryListingProps {
	label?: string
	productCount?: string
	color?: string
	image?: string
	onClick?: () => void
}

export default function CategoryListing ({ label, productCount, image, color, onClick } : CategoryListingProps) {
	const theme = useTheme()

	return (
		<TouchableOpacity className='w-full h-24 px-1 rounded-xl flex-row justify-between' onPress={onClick} >
			<View className='h-full flex-row items-center gap-5' >
				<View className={`items-center justify-center w-14 rounded-md aspect-square ${color}`}>
					<ImageCust source={image} width={56} height={56} />
				</View>
				<View className='flex-col'>
					<AppText className='text-xl' bold>{label}</AppText>
					<AppText>{productCount}</AppText>
				</View>
			</View>
			<View className='justify-center'>
				<MaterialIcons name='chevron-right' color={theme.colors.onSecondaryContainer} size={20} />
			</View>
		</TouchableOpacity>
	)
}