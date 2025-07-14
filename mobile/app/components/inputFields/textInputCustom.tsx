import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import TextInputLabel from '../texts/inputTextLabel'


interface TextInputCustomProps {
	label: string
	className?:string
	onValueChange?: (newValue: string) => void
}


function TextInputCustom({ className, label, onValueChange }: TextInputCustomProps) {
	const [value, setValue] = useState<string>("")

	const handleTextChange = (newText: string) => {
		setValue(newText)
		onValueChange && onValueChange(newText)
	}

	return (
		<TextInput
			mode="outlined"
			className={`${className}`}
			label={<TextInputLabel>{label}</TextInputLabel>}
			value={value}
			onChangeText={handleTextChange}
			contentStyle={{ fontFamily: "Zain_400Regular" }}
		/>
	)
}

export default TextInputCustom