import React, { useState } from "react";
import { View, StyleSheet, ScrollView, ImageBackground, Text, TouchableOpacity } from "react-native";
import MyBLE from "@/src/components/MyBLe";
import { COLORS, images } from "@/constants";
import WeatherComponent from "@/src/components/WeatherComponent";
import BluetoothCard from "@/src/components/BluetoothCard";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import WifiDialog from "@/src/components/WifiDialog";
import { configWifi } from "@/utils/send-ble";
import DailyDialog from "@/src/components/dailyDialog";

const AddScreen = () => {
  const [wifiModalVisible, setWifiModalVisible] = useState(false);
  const [consommationModalVisible, setConsommationModalVisible] = useState(false);
  const [addApplianceModalVisible, setAddApplianceModalVisible] = useState(false);
  const handleConnect = ({ ssid, password }: { ssid: string; password: string }) => {
    console.log("SSID:", ssid, "Password:", password);
    // TODO: Connexion réelle ou enregistrement
    configWifi(ssid, password);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View style={{backgroundColor: COLORS.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10, marginBottom: 10}}>
      <WeatherComponent />
    </View>
    <BluetoothCard/>
    <View style={styles.card}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name="meeting-room" size={28} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.text}>Add Room</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.card]}>
      <TouchableOpacity 
      style={{ flexDirection: "row", alignItems: "center" }} 
      onPress={() => setAddApplianceModalVisible(true)}
      >
      <Fontisto name="lightbulb" size={28} color="black" style={{ marginRight: 10 }} />
      <Text style={styles.text}>Add Device</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setConsommationModalVisible(true)}>
        <Fontisto name="plus-a" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.text}>Add daily max consumption</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Fontisto name="plus-a" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.text}>Add monthly max consumption</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Fontisto name="plus-a" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.text}>Add Devices max consumption</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
    <View style={[styles.card]}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setWifiModalVisible(true)}>
        <Fontisto name="wifi" size={28} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.text}>Configuration Wifi</Text>
      </TouchableOpacity>
    </View>
    <WifiDialog
        visible={wifiModalVisible}
        onClose={() => setWifiModalVisible(false)}
        onConnect={handleConnect}
      />
    <DailyDialog
        visible={consommationModalVisible}
        onClose={() => setConsommationModalVisible(false)}
        onConnect={(data) => {
          console.log("Daily Consumption:", data);
          setConsommationModalVisible(false);
        }}
      />
  </ScrollView>
  );
};


export default AddScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0, marginBottom: 0 },
  text: {
    fontSize: 16,
    fontFamily: "regular",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3, // Pour Android
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10, // espace autour
  },
});
