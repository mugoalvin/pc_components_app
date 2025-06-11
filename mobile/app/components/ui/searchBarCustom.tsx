import { Searchbar, useTheme } from "react-native-paper";

interface SearchBarCustomProps {
	searchValue?: string
	isSearchBarloading?: boolean
	focused?: boolean
	changeButtonLoading?: () => void
	setSearchValue?: (text: string) => void
}

export default function SearchBarCustom({ searchValue, isSearchBarloading, focused, changeButtonLoading, setSearchValue }: SearchBarCustomProps) {
	const theme = useTheme()

	return (
		<Searchbar
				value={searchValue || ""}
				placeholder='Search Component Category...'
				onChangeText={newText => setSearchValue && setSearchValue(newText)}
				inputStyle={{ fontFamily: "Zain_400Regular", fontSize: theme.fonts.titleMedium.fontSize }}
				style={{ borderRadius: 10 }}
				iconColor={theme.colors.onBackground}
				showDivider
				elevation={3}
				loading={isSearchBarloading}
				theme={theme}
				onSubmitEditing={changeButtonLoading}
				autoFocus={focused}
			/>
	)
}