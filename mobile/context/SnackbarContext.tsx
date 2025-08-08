import AppText from "@/app/components/texts/appText";
import { createContext, ReactNode, useContext, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";

export type SnackbarParams = {
  message?: string;
  isError?: boolean;
  isWarning?: boolean;
};
type SnackbarContextType = {
	showSnackbar: ({ message, isError, isWarning }: SnackbarParams) => void
}
export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const theme = useTheme()
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [message, setMessage] = useState<string>('')
	const [isError, setIsError] = useState<boolean>(false)
	const [isWarning, setIsWarning] = useState<boolean>(false)


	const showSnackbar = ({message, isError = false, isWarning = false}: SnackbarParams) => {
		console.log("Snackbar called:", { message, isError, isWarning }) // Debug

		setMessage(message!)
		setIsVisible(true)
		setIsError(isError)
		setIsWarning(isWarning)
	}

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar
				visible={isVisible}
				onDismiss={() => {
					setIsVisible(false)
					setMessage('')
					setIsError(false)
					setIsWarning(false)
				}}
				duration={3000}
				style={{
					marginHorizontal: 10,
					marginBlockEnd: 20,
					padding: 0,
					backgroundColor: 
						isError ? theme.colors.errorContainer :
						isWarning ? theme.colors.tertiaryContainer :
						theme.colors.secondaryContainer
				}}
				contentStyle={{
					justifyContent: 'flex-end',
				}}
			>
				<AppText
					className="text-xl"
					color={
						isError ? theme.colors.onErrorContainer :
						isWarning ? theme.colors.tertiary :
						// theme.colors.onSecondaryContainer
						theme.colors.primary
					}
				>
					{message}
				</AppText>
			</Snackbar>
		</SnackbarContext.Provider>
	)
}


export default function useSnackbarContext() {
	const context = useContext(SnackbarContext)
	if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider")
	return context
}