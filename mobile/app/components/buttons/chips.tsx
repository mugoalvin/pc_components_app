import { Chip, useTheme } from "react-native-paper"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"
import AppText from "../texts/appText"

interface ChipsProps {
	chipText: string
	icon?: IconSource
	selected?: boolean
	onPress?: () => void
}


const ChipCustom = ({chipText, selected, icon, onPress} : ChipsProps) => {
	const theme = useTheme()

	return (
		<Chip
			mode="flat"
			icon={icon}
			onPress={onPress}
			selected={selected}
			selectedColor={theme.colors.inverseOnSurface}
			closeIcon="cancel"
			showSelectedOverlay={true}
			background={{
				color: theme.colors.secondaryContainer,
			}}
			style={{
				// backgroundColor: selected ? theme.colors.secondary : theme.colors.elevation.level1,
				backgroundColor: selected ? theme.colors.secondary : theme.colors.secondaryContainer,
				borderColor: selected ? theme.colors.outline : theme.colors.outlineVariant
			}}
		>
			<AppText color={selected ? theme.colors.onSecondary : theme.colors.onSurface}>{chipText}</AppText>
			{/* <AppText>{chipText}</AppText> */}
		</Chip>
	)
}

export default ChipCustom