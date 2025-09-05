import useSnackbarContext from '@/context/SnackbarContext'
import { AntDesign } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import HeaderBackArrow from '../components/headerBackArrow'
import AppText from '../components/texts/appText'
import Body from '../components/ui/body'
import RyzenMainInfo from '../components/ui/productDetails/ryzenMainInfo'
import Specifications from '../components/ui/specifications'

export default function ProductDetails() {
	const theme = useTheme()
	const navigation = useNavigation()
	const { showSnackbar } = useSnackbarContext()
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
		<Body >
			{
				product.family &&
				product.family === 'Ryzen' &&
				<RyzenMainInfo product={product} />
			}

		</Body>
	)
}

