import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { Circle, G, Text as SvgText } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import { COLORS } from "@/constants";

const { width } = Dimensions.get("window");
const radius = 70;
const strokeWidth = 15;
const circumference = 2 * Math.PI * radius;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DonutChart = ({ percentage = 60 }) => {
  const animatedValue = useSharedValue(0);

  // Animation au montage
  useEffect(() => {
    animatedValue.value = withTiming(percentage, { duration: 1500 });
  }, [percentage]);

  // Animation du cercle
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedValue.value / 100),
  }));

  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>

      <Svg width={radius * 2} height={radius * 2}>
        <G rotation="-90" originX={radius} originY={radius}>
          {/* Cercle de fond */}
          <Circle cx={radius} cy={radius} r={radius-10} stroke="#EAEAEA" strokeWidth={strokeWidth} fill="none" />

          {/* Cercle animé */}
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={radius-10}
            stroke={COLORS.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>

        {/* Texte au centre */}
        <SvgText
          x="45%"
          y="55%"
          textAnchor="middle"
          fontSize="20"
          fontFamily="bold"
          fill="#333"
        >
          {percentage}%
        </SvgText>
      </Svg>
    </View>
  );
};

export default DonutChart;
