import useSnackbarContext from '@/context/SnackbarContext'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import HeaderBackArrow from '../components/headerBackArrow'
import Body from '../components/ui/body'
import RyzenMainInfo from '../components/ui/productDetails/ryzenMainInfo'

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

// <View className='flex-row justify-center'>

// </View>


// <View>
// 	<View className='flex-row items-baseline justify-between'>
// 		{
// 			product?.recommended_customer_price
// 				? <AppText bold className='text-4xl'>{product?.recommended_customer_price}</AppText>
// 				: <AppText className='text-2xl'>{product?.name}</AppText>
// 		}
// 		<IconButton
// 			icon={() =>
// 				<AntDesign name='hearto' color={theme.colors.primary} size={16} />
// 			}
// 			onPress={() => { }}
// 		/>
// 	</View>
// 	{
// 		product?.recommended_customer_price && (
// 			<View className='flex-row items-baseline gap-3'>
// 				<AppText className='text-2xl'>{product?.name}</AppText>
// 				<AppText color={theme.colors.onSurfaceDisabled}>{`${product.series} | ${product.architecture}`}</AppText>
// 			</View>
// 		)
// 	}
// </View>