import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface ExpandableContainerProps {
	isExpanded?: SharedValue<boolean>
	children?: ReactNode
	viewKey?: string
	duration?: number
}

export default function ExpandableContainer({ isExpanded, children, viewKey, duration = 500 }: ExpandableContainerProps) {
	console.log("Container's value: ", isExpanded?.value)
	const height = useSharedValue(0);
	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded && isExpanded.value), {
			duration,
		})
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));



	const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: 'center',
				paddingTop: 24,
			},
			buttonContainer: {
				flex: 1,
				// paddingBottom: '1rem',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			},
			content: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			},
			parent: {
				width: 200,
			},
			wrapper: {
				width: '100%',
				position: 'absolute',
				display: 'flex',
				alignItems: 'center',
			},
			animatedView: {
				width: '100%',
				overflow: 'hidden',
			},
			box: {
				height: 120,
				width: 120,
				color: '#f8f9ff',
				backgroundColor: '#b58df1',
				borderRadius: 20,
				alignItems: 'center',
				justifyContent: 'center',
			},
		});


	return (
		<Animated.View
			style={styles.animatedView}
			key={`accordionItem_${viewKey}`} className="max-h-fit">
			<View
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height;
				}}>
				{children}
			</View>
		</Animated.View>
	)
}