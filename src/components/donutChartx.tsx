import React, { useEffect } from 'react';
import { StyleSheet, View, useColorScheme, Text } from 'react-native';
import Svg, { G, Circle, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS as colors } from '@/constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DonutChartProps {
  size: number;
  strokeWidth: number;
  value: number;
  maxValue: number;
  centerLabel: string;
  centerValue: string;
  centerLabelFontSize?: number;
  centerValueFontSize?: number;
}

export default function DonutChart({
  size,
  strokeWidth,
  value,
  maxValue,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfSize = size / 2;
  const animatedProgress = useSharedValue(0);

  // Determine color based on value
  let progressColor = colors.primary;
  const percentage = (value / maxValue) * 100;
  
  if (percentage > 90) {
    progressColor = colors.error;
  } else if (percentage > 75) {
    progressColor = colors.warning;
  }

  useEffect(() => {
    animatedProgress.value = withTiming(value / maxValue, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [value, maxValue, animatedProgress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${halfSize}, ${halfSize}`}>
          <Circle
            cx={halfSize}
            cy={halfSize}
            r={radius}
            stroke={colors.secondaryGray}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <AnimatedCircle
            cx={halfSize}
            cy={halfSize}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>
        
        {/* Center label and value are separate React Native Text components for better styling */}
      </Svg>
      
      <View style={[styles.labelContainer, { width: size, height: size }]}>
        <Text style={{fontFamily:"bold", color:colors.primary, fontSize:24}}>{centerValue}</Text>
        <Text style={{fontFamily:"regular", color:colors.gray, fontSize:12}}>{centerLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});