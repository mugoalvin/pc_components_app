import useRadeonStore from '@/zustand/amd/radeon'
import useRyzenStore from '@/zustand/amd/ryzen'
import useIntelArkStore from '@/zustand/intel/ark'
import useIntelCoreStore from '@/zustand/intel/core'
import useIntelCoreUltraStore from '@/zustand/intel/ultra'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { DatabaseTables } from '../../../../packages/types'
import ImageCust from '../images/imageCust'
import AppText from '../texts/appText'

interface CategoryListingProps {
	label?: string
	productCount?: string
	image?: string
	tables?: DatabaseTables | DatabaseTables[]
	onClick?: () => void
}


export default function CategoryListing({ label, tables, image, onClick }: CategoryListingProps) {
	const theme = useTheme()
	const ryzenCount = useRyzenStore(state => state.ryzen_inventory_count)
	const radeonCount = useRadeonStore(state => state.radeon_inventory_count)

	const coreCount = useIntelCoreStore(state => state.intel_core_inventory_count)
	const ultraCount = useIntelCoreUltraStore(state => state.intel_ultra_inventory_count)
	const arkCount = useIntelArkStore(state => state.ark_inventory_count)


	// Add more hooks as needed

	let noRows = 0
	if (typeof (tables) === 'string') {
		if (tables === 'ryzen') {
			noRows = ryzenCount
		} else if (tables === 'radeon') {
			noRows = radeonCount
		} else if (tables === 'core') {
			noRows = coreCount
		} else if (tables === 'ultra') {
			noRows = ultraCount
		} else if (tables === 'ark') {
			noRows = arkCount
		} else {
			noRows = 0
		}
	} else if (Array.isArray(tables)) {
		noRows = tables.reduce((sum, table) => {
			if (table === 'core') {
				return sum + coreCount
			} else if (table === 'ultra') {
				return sum + ultraCount
			} else if (table === 'ark') {
				return sum + arkCount
			} else if (table === 'ryzen') {
				return sum + ryzenCount
			} else if (table === 'radeon') {
				return sum + radeonCount
			} else {
				return sum
			}
		}, 0)
	}

	return (
		<TouchableOpacity className='w-full h-24 px-1 rounded-xl flex-row justify-between' onPress={onClick} >
			<View className='h-full flex-row items-center gap-5' >
				<View className={`items-center justify-center w-14 rounded-md aspect-square`}>
					<ImageCust source={image} width={56} height={56} />
				</View>
				<View className='flex-col'>
					<AppText className='text-xl' bold>{label}</AppText>
					<AppText>{noRows} Products</AppText>
				</View>
			</View>
			<View className='justify-center'>
				<MaterialIcons name='chevron-right' color={theme.colors.onSecondaryContainer} size={20} />
			</View>
		</TouchableOpacity>
	)
}
