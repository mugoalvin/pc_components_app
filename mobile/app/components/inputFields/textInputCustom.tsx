import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import TextInputLabel from '../texts/inputTextLabel'


interface TextInputCustomProps {
	label: string
	className?:string
}


function TextInputCustom({ className, label }: TextInputCustomProps) {
	const [value, setValue] = useState<string>("")

	return (
		<TextInput
			mode="outlined"
			className={`${className}`}
			label={<TextInputLabel>{label}</TextInputLabel>}
			value={value}
			onChangeText={(newText) => setValue(newText)}
			contentStyle={{ fontFamily: "Zain_400Regular" }}
		/>
	)
}

export default TextInputCustom