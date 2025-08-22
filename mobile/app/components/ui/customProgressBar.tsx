import { ProgressBar } from "react-native-paper";

interface ProgressBarCustomProps {
	progress: number | undefined
}

export default function ProgressBarCustom({ progress }: ProgressBarCustomProps) {
	return (
		<ProgressBar
			visible={!(progress === undefined || progress === 0)}
			indeterminate={progress! > 100}
			progress={progress === undefined ? 0 : progress / 100}
			style={{
				marginBottom: 0,
				height: 2,
			}}
		/>
	)
}