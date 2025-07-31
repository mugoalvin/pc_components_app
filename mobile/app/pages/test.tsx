import { useNavigation } from "expo-router"
import { useEffect } from "react"
import HeaderBackArrow from "../components/headerBackArrow"
import Body from "../components/ui/body"

export default function Test() {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Sortable List",
			headerLeft: () => <HeaderBackArrow />
		})
	})

	return (
		<Body>

		</Body>
	)
}