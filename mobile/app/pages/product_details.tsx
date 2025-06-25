import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import HeaderBackArrow from '../components/headerBackArrow'
import Body from '../components/ui/body'
import Specifications from '../components/ui/specifications'
import Compatibility from './compatibility'

export default function ProductDetails() {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Intel i7-10850H",
			headerLeft: () => (
				<HeaderBackArrow />
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