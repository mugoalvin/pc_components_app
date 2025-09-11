import AppText from "@/app/components/texts/appText"
import Body from "@/app/components/ui/body"
import { ProductBrandFilter } from "@/utils/types"
import { useLocalSearchParams } from "expo-router"
import RadeonRXProducts from "./radeon_rx_products"

const routes = [
	{
		condition: (params: any) =>
			String(params.selectedComponent) === '1' &&
			String(params.brand) === '2' &&
			String(params.radeonLine) === '1',
		component: <RadeonRXProducts />,
	}
]


export default function RadeonNavigator() {
	const params = useLocalSearchParams() as Partial<ProductBrandFilter | any>

	for (const route of routes) {
		if (route.condition(params)) {
			return route.component
		}
	}

	return (
		<Body>
			<AppText>Over Here</AppText>
		</Body>
	)
}