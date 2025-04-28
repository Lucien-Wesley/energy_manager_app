import { COLORS, images } from "@/constants";
import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { getBluetoothData, getBluetoothId } from "@/utils/bluetooth-connect";
import { router } from "expo-router";

interface BluetoothCardProps {
  connected?: boolean;
  macAddress?: string;
  version?: string;
  deviceName?: string;
}

const BluetoothCard  = () => {
  const [bluetoothData, setBluetoothData] = React.useState<{
    connected?: boolean;
    macAddress: string;
    version?: string;
    deviceName?: string;
  }>();

  useEffect(() => {
    const fetchBluetoothData = async () => {
      const data = await getBluetoothData();
      console.log("Bluetooth data fetched:", data);
      if (data) {
        console.log("Bluetooth data:", data);
        if (data.macAddress) {
          setBluetoothData(data as {
            connected?: boolean;
            macAddress: string;
            version?: string;
            deviceName?: string;
          });
        }
      }
    };
    fetchBluetoothData();
  }, []);

  const { connected, macAddress, version, deviceName } = bluetoothData || {};

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        {/* Image du compteur */}
        <View style={styles.imageContainer}>
          <Image source={images.compteur} style={styles.image} />
        </View>
        <View>
          {/* État de connexion */}
          <Text style={styles.status}>
            {connected ? "Device Connected" : "Device disconnected"}
          </Text>
          <Text style={styles.deviceName}>
            {connected && macAddress ? `${deviceName} (${macAddress.slice(-5)})` : "N/A"}
          </Text>

          {/* Informations */}
          <Text style={styles.info}>MAC: {macAddress}</Text>
          <Text style={styles.info}>Version: {version}</Text>
          {!connected && (
            <TouchableOpacity style={styles.bindButton} onPress={()=>router.push('/(add)')}>
              <Text style={styles.bindText}>Go bind</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* bouton */}
      <View style={styles.footer}></View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3, // Pour Android
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    //backgroundColor: COLORS.secondaryWhite,
  },
  image: {
    height: 140,
    marginRight: 15,
    flex: 1,
    width: 140,
    borderRadius: 75,
  },
  status: {
    fontSize: 16,
    color: "white",
    fontFamily: "bold",
  },
  deviceName: {
    fontSize: 14,
    color: "white",
    fontFamily: "regular",
  },
  info: {
    fontSize: 12,
    color: "white",
    marginTop: 2,
    fontFamily: "regular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  battery: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryBody: {
    width: 24,
    height: 12,
    backgroundColor: "white",
    borderRadius: 3,
    justifyContent: "center",
  },
  batteryLevel: {
    width: "60%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: 3,
  },
  batteryTip: {
    width: 3,
    height: 6,
    backgroundColor: "white",
    marginLeft: 2,
  },
  bindButton: {
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 16,
    width: "50%",
    alignSelf: 'center',
    elevation: 3,
    shadowColor: "#fff",
  },
  bindText: {
    color: "white",
    fontSize: 14,
    fontFamily: "bold",
  },
});

export default BluetoothCard;
