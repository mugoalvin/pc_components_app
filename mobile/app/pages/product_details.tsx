import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import Body from '../components/ui/body'
import Specifications from '../components/ui/specifications'
import Compatibility from './compatibility'

export default function ProductDetails() {
	const theme = useTheme()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Intel i7-10850H",
			headerLeft: () => (
				<TouchableOpacity className='w-10 h-10 justify-center' onPress={() => navigation.goBack()} >
					<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)
		})
	})


	return (
		<Body className='flex-row'>
			{/* <View className='items-center'>
				<InsetBlurBox
					height={150}
					width={150}
					shadowSize={30}
					color={theme.colors.background}
				>
					<Image
						source="https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2613900-ryzen-9-9950x.jpg"
						style={{ flex: 1 }}
					/>
				</InsetBlurBox>

			</View> */}

			<ScrollView>
				<Specifications />

				<Compatibility />
			</ScrollView>
		</Body>
	)
}