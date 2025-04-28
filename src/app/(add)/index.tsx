import { COLORS } from "@/constants";
import BLEPage from "@/src/components/BLEPage";
import WeatherComponent from "@/src/components/WeatherComponent";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const BluetoothScreen = () => (
  
  <ScrollView style={styles.container}>
    <View style={{ padding: 20 }}>
      <BLEPage />
    </View>
  </ScrollView>
);

export default BluetoothScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0},
  text: {
    fontSize: 24,
    fontFamily: "bold",
    color: "#333",
  },
});
