import AppText from "./appText"

interface BottomSheetHeaderProps {
	headerText: string
}
export default function BottomSheetHeader({ headerText }: BottomSheetHeaderProps) {
	return (
		<AppText className="text-4xl mb-3" bold>
			{
				headerText
			}
		</AppText>
	)
}