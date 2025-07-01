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
			closeIcon="cancel"
			showSelectedOverlay={true}
			background={{
				color: theme.colors.secondary,
				borderless: false,
				radius: 50,
				foreground: true
			}}
			// style={{
			// 	backgroundColor: selected ? theme.colors.secondaryContainer : theme.colors.elevation.level5
			// }}
		>
			<AppText color={theme.colors.secondary}>{chipText}</AppText>
		</Chip>
	)
}

export default ChipCustom