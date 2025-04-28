import React from 'react'
import { COLORS } from '@/constants';
import { useAnimatedProps } from 'react-native-reanimated';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import Animated from 'react-native-reanimated';

const MyBarChart = ({ data, chartWidth, barWidth }) => {
  return (
    <Svg width={chartWidth} height="230" viewBox={`0 0 ${chartWidth} 150`}>
      {data.map((item, index) => {
        const xPos = (index + 1) * (chartWidth / (data.length + 1));
        return (
          <React.Fragment key={index}>
            {/* Barre grise */}
            <Rect x={xPos - barWidth / 2.5} y={0} width={barWidth} height="150" fill="#E5E5E5" rx="5" />

            {/* Barre animée */}
            <AnimatedRect
              x={xPos - barWidth / 2.5}
              animatedProps={useAnimatedProps(() => ({
                y: 150 - item.value,
                height: item.value,
              }))}
              width={barWidth}
              fill={COLORS.primary}
              rx="5"
            />

            {/* Valeur au-dessus */}
            <SvgText x={xPos} y={-20} fontSize="12" fill="black" textAnchor="middle">
              {item.value}w
            </SvgText>

            {/* Label en dessous */}
            <SvgText x={xPos} y={170} fontSize="12" fill="black" textAnchor="middle">
              {item.label}
            </SvgText>
          </React.Fragment>
        );
      })}
    </Svg>
  )
}
  )
}

export default MyBarChart