import { COLORS } from "@/constants";
import DeviceCard from "@/src/components/deviceCard";
import DonutChart from "@/src/components/donutChartx";
import RoomCard from "@/src/components/roomCard";
import WeatherComponent from "@/src/components/WeatherComponent";
import { sendCommand } from "@/utils/send-ble";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, FlatList } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
    { name: "Living Room", usage: 100, color: "#FF5733", images: require("@/assets/images/livingroom.jpg") },
    { name: "Kitchen", usage: 80, color: "#33FF57", images: require("@/assets/images/kitchen.jpg") },
    { name: "Bedroom", usage: 60, color: "#3357FF", images: require("@/assets/images/bedroom.jpg") }
  ]
};

const devicesData = [
  { id: 1, icon: "lamp", name: "Lamp 1", isOn: false, power: '-', hours: '-' },
  { id: 2, icon: "lamp", name: "Lamp 2", isOn: false, power: '-', hours: '-' },
  { id: 3, icon: "lamp", name: "Lamp 3", isOn: false, power: '-', hours: '-' },
  { id: 4, icon: "vacuum", name: "Plugin 1", isOn: true, power: '-', hours: '-' },
];

const HomeScreen = () => {
  const [selectedTime, setSelectedTime] = useState<keyof typeof consumptionData>("weekly");
  const [isOpened, setIsOpened] = useState(false);
  const [devices, setDevices] = useState(devicesData);

  const toggleSwitch = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, isOn: !device.isOn } : device
      )
    );
    sendCommand(id.toString(), devices.find((device) => device.id === id)?.isOn ? "0" : "1", "toggle")
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{backgroundColor: COLORS.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10, marginBottom: 10}}>
        <WeatherComponent />
      </View>
      <View style={styles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10}}>
          <Text style={styles.title}>Electricity Usage</Text>

        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, paddingTop: 0}}>
        <DonutChart
            size={150}
            strokeWidth={20}
            value={20}
            maxValue={50}
            centerLabel="Current Cost"
            centerValue={`0 $`}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <View style={{width: '100%', height: 1, backgroundColor: COLORS.gray2,}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, paddingTop: 20}}>
              <View>
                <Text style={styles.textTitle}>Today</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Icon name="flash" size={20} color={COLORS.primary} />
                  <Text style={styles.text}>0 kWh</Text>
                </View>
              </View>
              <View style={{width: 1, height: "100%", backgroundColor: COLORS.gray2,}}></View>
              <View>
                <Text style={styles.textTitle}>This month</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Icon name="flash" size={20} color={COLORS.primary} />
                  <Text style={styles.text}>0 kWh</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 10,}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingBottom: 0}}>
          <Text style={styles.title}>Rooms</Text>
          <TouchableOpacity style={{ padding: 5, borderRadius: 8,}}>
            <Text style={{color: COLORS.primary, fontFamily: 'regular'}}>All Rooms</Text>
          </TouchableOpacity>
        </View>
        {data.rooms.map((device, index) => (
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
            <RoomCard image={device.images} title={device.name} devices={4} />
          </View>
        ))}
      </View>
      <View style={{ padding: 10, marginBottom: 70,}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
          <Text style={styles.title}>Devices</Text>
          <TouchableOpacity style={{ padding: 10, borderRadius: 8,}}>
            <Text style={{color: COLORS.primary, fontFamily: 'regular'}}>All Devices</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <DeviceCard item={item} onPress={()=>toggleSwitch(item.id)}/>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0},
  textTitle: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: "#333",
  },
  text: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#333",
  },
  title: { fontSize: 18, fontFamily: "bold", marginBottom: 10 },

  // Dropdown
  dropdownButtonStyle: { width: 100, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, },
  dropdownButtonArrowStyle: { fontSize: 28,},
  dropdownMenuStyle: { backgroundColor: COLORS.white, borderRadius: 8, },
  dropdownItemStyle: { width: '100%', flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, },
  dropdownItemTxtStyle: {flex: 1, fontSize: 14, fontFamily: 'regular', color: COLORS.gray, },
  dropdownText: { fontSize: 16, textAlign: "center", fontFamily: "regular" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 1,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3, // Pour Android
  },
});
