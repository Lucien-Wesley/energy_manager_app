import React, { useState } from 'react';
import { StyleSheet, useColorScheme, Dimensions, Platform } from 'react-native';
import { EnergyData } from '@/constants/MockData';
import Card from '@/src/components/card';
import { Text } from '@/src/components/themedText';
import { View } from '@/src/components/themedView';
import {COLORS as colors} from '@/constants';

// Only import Victory components when not on web
let VictoryChart: typeof import('victory').VictoryChart | null = null;
let VictoryLine: typeof import('victory').VictoryLine | null = null;
let VictoryAxis: typeof import('victory').VictoryAxis | null = null;
let VictoryTheme: typeof import('victory').VictoryTheme | null = null;
let VictoryVoronoiContainer: typeof import('victory').VictoryVoronoiContainer | null = null;
let VictoryTooltip: typeof import('victory').VictoryTooltip | null = null;

if (Platform.OS !== 'web') {
  const VictoryImports = require('victory-native');
  VictoryChart = require('victory').VictoryChart;
  VictoryLine = require('victory').VictoryLine;
  VictoryAxis = require('victory').VictoryAxis;
  VictoryTheme = require('victory').VictoryTheme;
  VictoryVoronoiContainer = require('victory').VictoryVoronoiContainer;
  VictoryTooltip = require('victory').VictoryTooltip;
}

interface EnergyChartProps {
  data: EnergyData[];
  dataType: 'consumption' | 'voltage' | 'current';
  title: string;
  unit: string;
}

export default function EnergyChart({ data, dataType, title, unit }: EnergyChartProps) {
  const getLineColor = () => {
    switch (dataType) {
      case 'consumption':
        return colors.primary;
      case 'voltage':
        return colors.secondary;
      case 'current':
        return colors.warning;
      default:
        return colors.primary;
    }
  };
  
  // Format dates for x-axis
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  // Extract relevant data for chart
  const chartData = data.map((item) => ({
    x: new Date(item.date),
    y: item[dataType],
    label: `${item[dataType].toFixed(2)} ${unit}`,
  }));
  
  // Calculate chart dimensions
  const chartWidth = Math.min(Dimensions.get('window').width - 40, 600);
  
  // Create a web-friendly placeholder component
  const WebChartPlaceholder = () => (
    <View style={[styles.chartContainer, { height: 220, justifyContent: 'center', alignItems: 'center' }]} bg="white">
      <Text>Charts are only available on mobile devices</Text>
      <Text size="sm" style={{ marginTop: 16, opacity: 0.7 }}>
        {`Latest ${dataType}: ${data.length > 0 ? `${data[data.length - 1][dataType].toFixed(2)} ${unit}` : 'No data'}`}
      </Text>
    </View>
  );
  
  return (
    <Card style={styles.container}>
      <View style={styles.header} bg="white">
        <Text weight="semibold" size="lg">{title}</Text>
      </View>
      
      {Platform.OS !== 'web' && VictoryChart && VictoryLine && VictoryAxis && VictoryTheme && VictoryVoronoiContainer && VictoryTooltip ? (
        <View style={styles.chartContainer} bg="white">
          <VictoryChart
            width={chartWidth}
            height={220}
            padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
            theme={VictoryTheme.material}
            domainPadding={{ y: 20 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => datum.label}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={5}
                    flyoutStyle={{
                      fill: colors.white,
                      stroke: colors.gray2,
                    }}
                    style={{ fill: colors.black }}
                  />
                }
              />
            }
          >
            <VictoryAxis
              tickFormat={(x: string | number | Date) => {
                const date = new Date(x);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
              style={{
                axis: { stroke: colors.gray2 },
                tickLabels: { 
                  fill: colors.black, 
                  fontSize: 10,
                  padding: 5,
                },
                grid: { stroke: 'transparent' },
              }}
              tickCount={5}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: colors.gray2 },
                tickLabels: { 
                  fill: colors.black, 
                  fontSize: 10,
                  padding: 5,
                },
                grid: { stroke: colors.secondaryGray, strokeDasharray: '5,5' },
              }}
            />
            <VictoryLine
              data={chartData}
              style={{
                data: { 
                  stroke: getLineColor(),
                  strokeWidth: 3,
                },
              }}
              animate={{
                duration: 500,
                onLoad: { duration: 500 },
              }}
            />
          </VictoryChart>
        </View>
      ) : (
        <WebChartPlaceholder />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
  },
  header: {
    padding: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  chartContainer: {
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
});