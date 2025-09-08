import { SectionedDataItem } from "@/utils/types"
import { RefreshControl, SectionList, useColorScheme } from "react-native"
import { useTheme } from "react-native-paper"
import ProductOverviewCard from "../cards/productOverviewCard"
import AppText from "../texts/appText"
import EmptySectionList from "./emptySectionList"
import SectionListParentView from "./sectionListParentView"

interface CustomSectionListProps {
	isPageRefreshing?: boolean
	sections: SectionedDataItem[]
	onItemPress?: (item: any, index: number) => void
	onrefresh?: () => void
}
export default function CustomSectionList({ sections, isPageRefreshing = false, onItemPress, onrefresh }: CustomSectionListProps) {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	return (
		<SectionList
			className="mt-3"
			stickySectionHeadersEnabled
			showsVerticalScrollIndicator={false}
			sections={sections}
			keyExtractor={(item, index) => item.name + index}
			refreshControl={
				<RefreshControl
					colors={[theme.colors.inversePrimary, theme.colors.errorContainer]}
					progressBackgroundColor={theme.colors.inverseSurface}
					refreshing={isPageRefreshing}
					onRefresh={onrefresh}
				/>
			}
			stickyHeaderHiddenOnScroll
			renderSectionHeader={({ section: { title } }) => (
				<AppText
					key={title}
					bg_color={colorScheme === 'light' ? theme.colors.elevation.level1 : theme.colors.background}
					bold
					className='text-3xl'
					color={theme.colors.onBackground}
				>
					{title}
				</AppText>
			)}

			renderItem={() => null}

			renderSectionFooter={({ section }) => (
				<SectionListParentView>
					{
						(section.data).map((item, index) =>
							<ProductOverviewCard
								index={index}
								key={index}
								title={item.name}
								productCount={item.count}
								lastUpdated={item.lastUpdated}
								onPress={() => onItemPress && onItemPress(item, index)}
							/>
						)
					}
				</SectionListParentView>
			)}

			ListEmptyComponent={<EmptySectionList />}
		/>
	)
}