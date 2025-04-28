import { COLORS } from "@/constants";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WeatherComponent = () => {
  return (
    <View style={styles.container}>
        <View>
        <View style={styles.weatherInfo}>
            <Icon name="weather-sunny" size={24} color="#FFC107" />
            <Text style={styles.temp}>28°C</Text>
        </View>
        <Text style={styles.subText}>Today Weather</Text>
    </View>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={styles.profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: COLORS.white, borderRadius: 10, },
  weatherInfo: { flexDirection: "row", alignItems: "center" },
  temp: { fontSize: 18, fontFamily: "semiBold", marginLeft: 5 },
  subText: { fontSize: 12, color: "gray", marginLeft: 5, fontFamily: "regular" },
  profile: { width: 40, height: 40, borderRadius: 20 },
});

export default WeatherComponent;
