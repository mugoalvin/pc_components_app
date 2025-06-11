import { openPage } from '@/utils/stackOptions'
import { DashboardCategoryTypeArray, DashboardCategoryTypeEnum, ProcessorsEnum, ProductsBrandModel } from '@/utils/types'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import CategoryListing from '../components/cards/categoryListing'
import Body from '../components/ui/body'

export default function ProductsBrands() {
	const theme = useTheme()
	const navigator = useNavigation()
	const params = useLocalSearchParams() as Partial<ProductsBrandModel>
	const { product } = params
	const capitalizeFirstCharacter = (text: string) => (text.slice(0, 1) as string).toUpperCase().concat((text as string).slice(1))


	useEffect(() => {
		navigator.setOptions({
			title: capitalizeFirstCharacter(DashboardCategoryTypeArray[product || 0]),
			headerLeft: () => (
				<TouchableOpacity className='w-10 h-10 justify-center' onPress={() => navigator.goBack()} >
					<Ionicons name='chevron-back' size={20} color={theme.colors.onBackground} />
				</TouchableOpacity>
			)
		})
	})



	return (
		<Body>
			<ScrollView className='gap-3'>

				{
					String(product) === "0" && (
						<>
							<CategoryListing
								key='AMD'
								label='AMD'
								image={require('../../assets/images/amd_logo.png')}
								productCount='12 products'
								onClick={() => openPage({
									product: DashboardCategoryTypeEnum.Processors,
									brand: ProcessorsEnum.AMD
								})}
							/>

							<Divider bold  />

							<CategoryListing
								key='Intel'
								label='Intel'
								image={require("../../assets/images/intel_logo.png")}
								productCount='20 products'
								onClick={() => openPage({
									product: DashboardCategoryTypeEnum.Processors,
									brand: ProcessorsEnum.Intel
								})}
							/>
						</>
					)
				}

				{
					String(product) === '1' && (
						<>
							<CategoryListing
								key='Ark'
								label='Intel Arc'
								image={"https://static.wikia.nocookie.net/logopedia/images/8/84/Intel_Arc_Badge.png/revision/latest/scale-to-width-down/1000?cb=20230618181757"}
								productCount='4 products'
								onClick={() => openPage({
									product: DashboardCategoryTypeEnum.Processors,
									brand: ProcessorsEnum.AMD
								})}
							/>

							<Divider bold />

							<CategoryListing
								key='Radeon'
								label='AMD Radeon'
								image={require("../../assets/images/radeon_logo.png")}
								productCount='16 products'
								onClick={() => openPage({
									product: DashboardCategoryTypeEnum.Processors,
									brand: ProcessorsEnum.AMD
								})}
							/>

							<Divider bold />

							<CategoryListing
								key='Nvidia'
								label='Nvidia'
								image={require("../../assets/images/nvidia_logo.png")}
								productCount='16 products'
								onClick={() => openPage({
									product: DashboardCategoryTypeEnum.Processors,
									brand: ProcessorsEnum.AMD
								})}
							/>

						</>
					)
				}

			</ScrollView>
		</Body>
	)
}