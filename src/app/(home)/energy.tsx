import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Animated, { FadeInUp } from "react-native-reanimated";
import WeatherComponent from "@/src/components/WeatherComponent";
import { Svg, Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/constants";
import SelectDropdown from "react-native-select-dropdown";
import BarChart from "@/src/components/barChart";
import MyBubbleChart from "@/src/components/myBubbleChart";
import { energyData } from "@/constants/MockData";
import { getCurrent, getEnergy, getVoltage } from "@/utils/consumption";

const { width } = Dimensions.get("window");

// Données JSON dynamiques
const consumptionData = {
  daily: [10, 20, 30, 25, 15, 10, 5],
  weekly: [50, 76, 120, 80, 50, 20, 40],
  monthly: [300, 450, 500, 320, 410, 390, 600]
};

const data = {
  devices: [
    { name: "Device 1", usage: 50 },
    { name: "Device 2", usage: 30 },
    { name: "Device 3", usage: 20 }
  ],
  rooms: [
    { name: "Living Room", usage: 100, color: "#FF5733", icon: "sofa" },
    { name: "Kitchen", usage: 80, color: "#33FF57", icon: "fridge" },
    { name: "Bedroom", usage: 60, color: "#3357FF", icon: "bed" }
  ]
};

const EnergyScreen = () => {
  const [selectedTime, setSelectedTime] = useState<keyof typeof consumptionData>("weekly");
  const [isOpened, setIsOpened] = useState(false);

  
  
  const [periodFilter, setPeriodFilter] = useState<'day' | 'week' | 'month'>('week');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [energy, setEnergy] = useState(0);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const c = await getCurrent();
      setCurrent(Number(c) || 0);
      const v = await getVoltage();
      setVoltage(Number(v) || 0);
      const e = await getEnergy();
      setEnergy(Number(e) || 0);
    };
    fetchData();
  });
  
  // Calculate average daily consumption
  const calculateAverageDailyConsumption = () => {
    const total = energyData.reduce((sum, item) => sum + item.consumption, 0);
    return (total / energyData.length).toFixed(2);
  };
  
  // Find peak consumption day
  const findPeakConsumptionDay = () => {
    let maxConsumption = 0;
    let peakDay = '';
    
    energyData.forEach(item => {
      if (item.consumption > maxConsumption) {
        maxConsumption = item.consumption;
        peakDay = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' });
      }
    });
    
    return peakDay;
  };
  
  // Filter data based on period
  const getFilteredData = () => {
    const now = new Date();
    let startDate: Date;
    
    switch (periodFilter) {
      case 'day':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'week':
      default:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
    }
    
    return energyData.filter(item => new Date(item.date) >= startDate);
  };
  
  const filteredData = getFilteredData();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: COLORS.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10, marginBottom: 10}}>
        <WeatherComponent />

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={styles.activeTab}>Electricity</Text>
          <Text style={styles.inactiveTab}>Devices</Text>
          <Text style={styles.inactiveTab}>Room</Text>
        </View>
      </View>
      <View style={{backgroundColor: COLORS.white, borderRadius: 20, padding: 10, marginBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
          <Text style={styles.title}>Electricity Usage</Text>

          {/* Dropdown pour choisir Jour/Semaine/Mois */}
          <SelectDropdown
            data={["Daily", "Weekly", "Monthly"]}
            onSelect={(selectedItem, index) => setSelectedTime(selectedItem.toLowerCase() as keyof typeof consumptionData)}
            renderButton={(selectedTime) => (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownText}>{(selectedTime && selectedTime)|| 'Weekly'}</Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            )}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: COLORS.secondary})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        {/* Graphique animé */}
        <Animated.View entering={FadeInUp.duration(800)}>
          <LineChart
            data={{
              labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
              datasets: [{ data: consumptionData[selectedTime] }]
            }}
            width={width - 10}
            height={220}
            withVerticalLines={false}
            withDots={false}
            segments={5}
            fromZero={true}
            yAxisSuffix=" kw"
            chartConfig={{
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: { r: "6", strokeWidth: "1", stroke: COLORS.primary },
              propsForLabels: { fontFamily: "regular" }
            }}
            bezier
            style={styles.chart}
          />
        </Animated.View>
      </View>
      <View style={{ backgroundColor: COLORS.white, borderRadius: 20, padding: 10, marginBottom: 10 }}>
        <Text style={styles.title}>Voltage, Current, and Energy</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
          <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: 'bold', color: COLORS.primary }}>Voltage</Text>
        <Text style={{ fontSize: 14, fontFamily: 'regular', color: COLORS.gray }}>{voltage} V</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: 'bold', color: COLORS.primary }}>Current</Text>
        <Text style={{ fontSize: 14, fontFamily: 'regular', color: COLORS.gray }}>{current} A</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontFamily: 'bold', color: COLORS.primary }}>Energy</Text>
        <Text style={{ fontSize: 14, fontFamily: 'regular', color: COLORS.gray }}>{energy} kWh</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0, marginBottom: 0 },
  tabs: { flexDirection: "row", marginBottom: 10, justifyContent: "space-around", backgroundColor: COLORS.white, padding: 10, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
  activeTab: { fontSize: 16, fontFamily: "semiBold", borderBottomWidth: 2, borderBottomColor: COLORS.primary, paddingBottom: 5 },
  inactiveTab: { fontSize: 16, color: "gray", marginLeft: 20, fontFamily: "regular" },
  
  timeSelection: { flexDirection: "row", justifyContent: "space-around", marginVertical: 15 },
  timeOption: { fontSize: 14, color: "gray", padding: 8 },
  selectedTime: { color: COLORS.primary, fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: COLORS.primary },

  chart: { borderRadius: 10, fontFamily: "regular" },

  title: { fontSize: 18, fontFamily: "bold", marginBottom: 10 },
  loadingText: { textAlign: "center", marginTop: 50, fontSize: 18 },
  chart2: { marginBottom: 20, borderRadius: 10 },
  roomsContainer: { flexDirection: "row", justifyContent: "space-around" },
  roomCard: { 
    width: 80, height: 240, borderRadius: 15, alignItems: "center", padding: 10 
  },
  roomText: { fontSize: 14, fontFamily: "bold", color: "#fff" },
  roomName: { fontSize: 12, color: "#fff", textAlign: "center", fontFamily: "regular" },

  // Dropdown
  dropdownButtonStyle: { width: 100, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, },
  dropdownButtonArrowStyle: { fontSize: 28,},
  dropdownMenuStyle: { backgroundColor: COLORS.white, borderRadius: 8, },
  dropdownItemStyle: { width: '100%', flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, },
  dropdownItemTxtStyle: {flex: 1, fontSize: 14, fontFamily: 'regular', color: COLORS.gray, },
  dropdownText: { fontSize: 16, textAlign: "center", fontFamily: "regular" },

  
  header: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  periodFilter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateButton: {
    padding: 8,
  },
  dateText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateIcon: {
    marginRight: 16,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  statsCard: {
    marginBottom: 18,
  },
  statsHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  statsContent: {
    padding: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statInfo: {
    flex: 1,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: 10,
    borderRadius: 12,
  },
});

export default EnergyScreen;
