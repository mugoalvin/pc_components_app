import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ryzen } from '../../../packages/interfaces'
import HeaderBackArrow from '../components/headerBackArrow'
import Body from '../components/ui/body'
import IntelInfoPage from './intel/intel_info_page'
import RyzenInfoPage from './ryzen/ryzenInfoPage'

export default function ProductDetails() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { processor } = useLocalSearchParams()
	const product = JSON.parse(processor as string) as Partial<any>

	useEffect(() => {
		navigation.setOptions({
			title: "",
			headerLeft: () => (
				<HeaderBackArrow />
			),
			headerShown: false
		})
	}, [])


	return (
		<Body>
			<SafeAreaView className='flex-1 gap-3'>
				{
					product.family &&
					product.family === 'Ryzen' &&
					<RyzenInfoPage product={product as Ryzen} />
				}

				{
					(product.name as string).toLowerCase().includes('intel') &&
					<IntelInfoPage product={product} />
				}
			</SafeAreaView>
		</Body>
	)
}