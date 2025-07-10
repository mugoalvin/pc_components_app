import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { AmdDevice, DataCenterSeries, IntelGenerationEnum, IntelGraphics, IntelTierEnum, IntelUltraSeriesEnum, NvidiaGeforceSeries, RadeonSeriesEnum, RyzenLaptopSeries } from "../../../packages/types";
import ButtonCustom from "../components/buttons/buttonCust";
import HeaderBackArrow from "../components/headerBackArrow";
import SubTitle from "../components/texts/subTitle";
import Body from "../components/ui/body";
import { connectDatabase, scrapeArk, scrapeCore, scrapeGeForce, scrapeRadeon, scrapeRyzen, scrapeUltra } from "../services/scrape";

export default function ScrapeData() {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			title: "Scrape",
			headerLeft: () => (
				<HeaderBackArrow />
			)
		})
	})

	return (
		<Body>

			<SubTitle>Database</SubTitle>

			<ButtonCustom
				btnText="Connect To The Database"
				onPress={connectDatabase}
			/>


			<SubTitle>AMD</SubTitle>

			<ButtonCustom
				btnText="Scrape Ryzen"
				onPress={() => scrapeRyzen({
					isLaptop: AmdDevice.Laptop,
					series: RyzenLaptopSeries.Ryzen200
				})}
			/>

			<ButtonCustom
				btnText="Scrape Radeon"
				onPress={() => scrapeRadeon({
					series: RadeonSeriesEnum.Series9000
				})}
			/>
			

			<SubTitle>Intel</SubTitle>

			<ButtonCustom
				btnText="Scrape Intel Ultra"
				onPress={() => scrapeUltra({
					series: IntelUltraSeriesEnum.Serie2
				})}
			/>

			<ButtonCustom
				btnText="Scrape Intel Core"
				onPress={() => scrapeCore({
					generation: IntelGenerationEnum.gen14,
					tier: IntelTierEnum.i9,
				})}
			/>

			<ButtonCustom
				btnText="Scrape Intel Arc"
				onPress={() => scrapeArk({
					family: IntelGraphics.DataCenter,
					series: DataCenterSeries.Max_Series
				})}
			/>


			<SubTitle>Intel</SubTitle>

			<ButtonCustom
				btnText="Scrape Nvidia"
				onPress={() => scrapeGeForce({
					series: NvidiaGeforceSeries.Series50
				})}
			/>
		</Body>
	)
}