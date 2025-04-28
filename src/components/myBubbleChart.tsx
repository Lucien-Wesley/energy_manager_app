import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Text as SvgText } from 'react-native-svg';

const MyBubbleChart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.powerText}>450w</Text>
            <Svg height="200" width="100">
                <Rect
                    x="10"
                    y="10"
                    width="80"
                    height={180}
                    rx="40"
                    fill="#7B61FF"
                />
                <SvgText
                    x="50"
                    y="100"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    Living
                </SvgText>
                <SvgText
                    x="50"
                    y="120"
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    Room
                </SvgText>
                <Circle
                    cx="50"
                    cy="160"
                    r="20"
                    fill="white"
                />
                <SvgText
                    x="50"
                    y="165"
                    fill="#7B61FF"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    Icon
                </SvgText>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    powerText: {
        marginBottom: 10,
        fontSize: 16,
        color: '#7B61FF',
    },
});

export default MyBubbleChart;