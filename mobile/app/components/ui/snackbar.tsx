import { Snackbar, useTheme } from "react-native-paper";
import SnackBarText from "../texts/snackBarText";

interface SnackBarMessageProps {
	isVisible: boolean
	message: string
	isError: boolean
	onDismissSnackBar: () => void
}

export default function SnackBarMessage({ isVisible, isError, message, onDismissSnackBar }: SnackBarMessageProps) {
	const theme = useTheme()


// Include below in the source file.

		// const [visible, setVisible] = useState(false)
		// const [snackBarMessage, setSnackBarMessage] = useState<string>("")
		// const [isSnackBarMessageAnError, setIsSnackBarMessageAnError] = useState<boolean>(false)
	
		// const displaySnackBar = () => setVisible(!visible)
		// const onDismissSnackBar = () => {
		// 	setVisible(false)
		// 	setSnackBarMessage('')
		// 	setIsSnackBarMessageAnError(false)
		// }


	return (
		<Snackbar
			visible={ isVisible }
			onDismiss={onDismissSnackBar}
			duration={ 3000 }
			theme={theme}
			style={{
				backgroundColor: isError ? theme.colors.errorContainer : theme.colors.inverseSurface,
			}}
		>
			<SnackBarText
				color={ isError ? theme.colors.error : undefined }
			>
				{ message }
			</SnackBarText>
		</Snackbar>
	)
}