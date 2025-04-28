import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface RoomCardProps {
  image: any;
  title: string;
  devices: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ image, title, devices }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.devicesRow}>
          <View style={styles.statusDot} />
          <Text style={styles.devicesText}>{devices} Devices</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: '100%',
    elevation: 3, // Pour Android
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    marginTop: 10,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "bold",
  },
  devicesRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
    marginRight: 6,
  },
  devicesText: {
    fontSize: 10,
    color: "gray",
    fontFamily: "regular",
  },
});

export default RoomCard;
