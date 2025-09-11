import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ryzen } from '../../../packages/interfaces'
import Body from '../components/ui/body'
import IntelInfoPage from './processors/intel/intel_info_page'
import RyzenInfoPage from './processors/ryzen/ryzen_info_page'
import RadeonInfoPage from './gpu/radeon/radeon_info_page'

export default function ProductDetails() {
	const navigation = useNavigation()
	const { processor } = useLocalSearchParams()
	const product = JSON.parse(processor as string) as Partial<any>

	useEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [navigation])


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

				{
					(product.name as string).toLowerCase().includes('radeon') &&
					<RadeonInfoPage product={product} />
				}
			</SafeAreaView>
		</Body>
	)
}