import { COLORS } from "@/constants";
import React from "react";
import { View, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import { Svg, Rect, Text } from "react-native-svg";

const { width } = Dimensions.get("window");
const chartWidth = width * 0.9; // 90% de la largeur de l'écran
const barWidth = chartWidth / 8.5; // Taille des barres ajustée

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BarChart = () => {
  const data = [
    { label: "TV", value: 76 },
    { label: "Lamp", value: 68 },
    { label: "AC", value: 120 },
    { label: "Fridge", value: 40 },
    { label: "Fridge", value: 40 },
  ];

  const maxValue = Math.max(...data.map((item) => item.value));

  const heights = data.map(() => useSharedValue(0));

  React.useEffect(() => {
    heights.forEach((h, i) => {
      h.value = withTiming((data[i].value / maxValue) * 100, { duration: 800 });
    });
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={chartWidth} height="230" viewBox={`0 0 ${chartWidth} 150`}>
        {data.map((item, index) => {
          const xPos = (index * chartWidth) / data.length + barWidth / 2;

          return (
            <React.Fragment key={index}>
              {/* Barre grise */}
              <Rect x={xPos - barWidth / 2.5} y={0} width={barWidth} height="150" fill="#E5E5E5" rx="5" />

              {/* Barre animée */}
              <AnimatedRect
                x={xPos - barWidth / 2.5}
                animatedProps={useAnimatedProps(() => ({
                  y: 150 - heights[index].value,
                  height: heights[index].value,
                }))}
                width={barWidth}
                fill={COLORS.primary}
                rx="5"
              />

              {/* Valeur au-dessus */}
              <Text x={xPos} y={-20} fontSize="12" fill="black" textAnchor="middle">
                {item.value}w
              </Text>

              {/* Label en dessous */}
              <Text x={xPos} y={170} fontSize="12" fill="black" textAnchor="middle">
                {item.label}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default BarChart;
