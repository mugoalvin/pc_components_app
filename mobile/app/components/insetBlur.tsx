import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface InsetBlurBoxProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string
  color?: string
  shadowSize?: number
}

export default function InsetBlurBox({ children, width = '100%', height = '100%', className, color, shadowSize }: InsetBlurBoxProps) {
  const styles = getStyle(shadowSize || 0)
  return (
    <View className={className} style={[styles.container, { width: width as import('react-native').DimensionValue, height: height as import('react-native').DimensionValue }]}>
      {/* Top Edge */}
      <LinearGradient
        colors={[color || "", 'transparent']}
        style={[styles.top, { width: width as import('react-native').DimensionValue }]}
        pointerEvents="none"
      />
      {/* Bottom Edge */}
      <LinearGradient
        colors={['transparent', color || ""]}
        style={[styles.bottom, { width: width as import('react-native').DimensionValue }]}
        pointerEvents="none"
      />
      {/* Left Edge */}
      <LinearGradient
        colors={[color || "", 'transparent']}
        style={[styles.left, { height: height as import('react-native').DimensionValue }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
      />
      {/* Right Edge */}
      <LinearGradient
        colors={['transparent', color || ""]}
        style={[styles.right, { height: height as import('react-native').DimensionValue }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

function getStyle(EDGE_SIZE: number) {
  return StyleSheet.create({
    container: {
      position: 'relative',
      overflow: 'hidden',
    },
    top: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: EDGE_SIZE,
      zIndex: 1,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: EDGE_SIZE,
      zIndex: 1,
    },
    left: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: EDGE_SIZE,
      zIndex: 1,
    },
    right: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: EDGE_SIZE,
      zIndex: 1,
    },
    content: {
      flex: 1,
      zIndex: 2,
    },
  })
}
