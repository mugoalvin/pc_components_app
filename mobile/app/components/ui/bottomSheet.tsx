import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

interface PageWithBottomSheetProps {
	children?: React.ReactNode
	sheetContent?: React.ReactNode
	ref?: React.Ref<BottomSheetMethods>
	initialSnapIndex?: number
	snapPoints?: (number | string)[]
	onChange?: (index: number) => void
}

export default function PageWithBottomSheet({ children, sheetContent, snapPoints, initialSnapIndex, ref, onChange }: PageWithBottomSheetProps) {
	const theme = useTheme()

	return (
		<GestureHandlerRootView>
			{children}
			<BottomSheet
				ref={ref}
				onChange={onChange}
				index={initialSnapIndex}
				snapPoints={snapPoints}
				enablePanDownToClose={true}

				handleIndicatorStyle={{
					backgroundColor: theme.colors.secondary
				}}
				backgroundStyle={{
					backgroundColor: theme.colors.secondaryContainer,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30
				}}
			>	
				<BottomSheetView style={{ marginHorizontal: 10 }}>
					{sheetContent}
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	)
}