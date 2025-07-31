import { View } from "react-native";
import CoreComponent from "./coreComponent";
import { openPage } from "@/utils/stackOptions";
import { ComponentTypeEnum } from "@/utils/types";

export default function Components() {
	return (
		<View className="flex-row justify-between">
			<CoreComponent key="processor" title="Processors" extra="AMD & Intel" iconLib="MaterialIcons" icon="memory" onPress={() => openPage({ selectedComponent: ComponentTypeEnum.Processors })} />
			<CoreComponent key="gpu" title='Graphics Cards' extra="Nvidia, Radeon" iconLib="MaterialIcons" icon='monitor' onPress={() => openPage({ selectedComponent: ComponentTypeEnum.Graphics })} />
		</View>
	)
}