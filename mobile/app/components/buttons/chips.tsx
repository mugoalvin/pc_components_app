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
			mode={selected ? "flat" : "outlined"}
			// mode="flat"
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
				// backgroundColor: selected ? theme.colors.onSecondaryContainer : theme.colors.secondary,
				backgroundColor: selected ? theme.colors.onSecondaryContainer : theme.colors.elevation.level1,
				borderColor: theme.colors.secondary
			}}
		>
			<AppText color={selected ? theme.colors.onSecondary : theme.colors.onSurface}>{chipText}</AppText>
			{/* <AppText color={theme.colors.onSecondary}>{chipText}</AppText> */}
		</Chip>
	)
}

export default ChipCustom