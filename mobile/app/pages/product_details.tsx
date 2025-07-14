import { Image } from 'expo-image'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Ryzen } from '../../../packages/interfaces'
import HeaderBackArrow from '../components/headerBackArrow'
import InsetBlurBox from '../components/insetBlur'
import Body from '../components/ui/body'
import Specifications from '../components/ui/specifications'
import Compatibility from './compatibility'

export default function ProductDetails() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { processor } = useLocalSearchParams()
	const product = JSON.parse(processor as string) as Partial<Ryzen>

	useEffect(() => {
		navigation.setOptions({
			title: product.name,
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	})


	return (
		<Body className='flex-col'>
			{
				product.image &&
				<View className='items-center'>
					<InsetBlurBox
						height={150}
						width={150}
						shadowSize={30}
						color={theme.colors.background}
					>
						<Image
							source={product.image}
							style={{ flex: 1 }}
						/>
					</InsetBlurBox>
				</View>
			}

			<ScrollView>
				<Specifications data={product} />

				<Compatibility />
			</ScrollView>
		</Body>
	)
}