import React from "react";
import { Svg, Circle, Text } from "react-native-svg"; // Utilise 'react-svg' pour React web

const BubbleChart = () => {
  const rooms = [
    { label: "Living Room", value: 450, color: "#6D41D9" },
    { label: "Bed Room", value: 230, color: "#FF6B6B" },
    { label: "Kitchen Room", value: 120, color: "#FFC107" },
    { label: "Bath Room", value: 110, color: "#007BFF" },
  ];

  return (
    <Svg width="350" height="200" viewBox="0 0 350 200">
      {rooms.map((room, index) => (
        <React.Fragment key={index}>
          {/* Cercle coloré */}
          <Circle cx={index * 80 + 50} cy="100" r="40" fill={room.color} />
          {/* Texte wattage */}
          <Text x={index * 80 + 50} y="50" fontSize="14" fill="black" textAnchor="middle">
            {room.value}w
          </Text>
          {/* Texte label */}
          <Text x={index * 80 + 50} y="160" fontSize="12" fill="black" textAnchor="middle">
            {room.label}
          </Text>
        </React.Fragment>
      ))}
    </Svg>
  );
};

export default BubbleChart;
