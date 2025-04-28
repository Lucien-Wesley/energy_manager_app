import React, { useEffect, useState, useRef } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, PermissionsAndroid, Platform, StyleSheet, Alert, 
  ActivityIndicator
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { Buffer } from "buffer";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { getBluetoothId, storeBluetoothData, storeBluetoothId } from "@/utils/bluetooth-connect";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BluetoothData {
  connected?: boolean;
  macAddress?: string;
  version?: string;
  deviceName?: string;
}

const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-abcdef123456";

const BLEPage: React.FC = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState<Device[]>([]);
  const devicesRef = useRef<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [receivedData, setReceivedData] = useState<string>("");
  const [bluetoothData, setBluetoothData] = useState<BluetoothData | null>(null);

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
      //tryReconnect(); // 🔁 Essayer de se reconnecter automatiquement
    };
    initialize();
  
    return () => {
      console.log("Nettoyage du Bluetooth...");
      manager.stopDeviceScan();
    };
  }, []);
  

  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.error("Permissions Bluetooth refusées !");
        return false;
      }
    }
    return true;
  };

  const startScan = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setScanning(true);
    console.log("Scanning Bluetooth ...");
    setDevices([]); 
    devicesRef.current = []; 

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setScanning(false);
        Alert.alert('Erreur', 'Une erreur est survenue pendant le scan ❌');
        return;
      }
      if (device?.name && !devicesRef.current.find((d) => d.id === device.id)) {
        devicesRef.current.push(device);
        setDevices([...devicesRef.current]); 
      }
    });

    setTimeout(() => {manager.stopDeviceScan(); setScanning(false);}, 5000);
    const bleId = await getBluetoothId();
    const id = bleId?.id;
    
    const lastDeviceId = id;
  };

  const tryReconnect = async () => {
    const bleId = await getBluetoothId();
    const id = bleId?.id;
    
    const lastDeviceId = id;
  if (!lastDeviceId) return;

  console.log("Tentative de reconnexion à :", lastDeviceId);
  let timeoutReached = false;

  // Timeout de sécurité après 5 secondes
  const timeout = setTimeout(() => {
    timeoutReached = true;
    console.warn("⏱️ Timeout : échec de reconnexion automatique");
  }, 5000);

  try {
    const connected = await manager.connectToDevice(lastDeviceId, { autoConnect: true });
    if (timeoutReached) return; // abandon si timeout déjà passé

    clearTimeout(timeout);

    await connected.discoverAllServicesAndCharacteristics();
    setConnectedDevice(connected);
    console.log("✅ Reconnecté automatiquement à :", connected.name);
    setBluetoothData({ ...bluetoothData, connected: true });

    storeBluetoothData(bluetoothData || {}); // Sauvegarder les données Bluetooth
    console.log("Données Bluetooth sauvegardées :", bluetoothData);

    monitorData(connected);
    monitorDisconnection(connected);
  } catch (error) {
    console.error("❌ Échec de reconnexion automatique :", error);
  } finally {
    clearTimeout(timeout);
  }
};


  const monitorData = async (device: Device) => {
    await manager.monitorCharacteristicForDevice(
      device.id,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.error("Erreur de notification :", error);
          return;
        }
        if (characteristic?.value) {
          const decodedValue = Buffer.from(characteristic.value, "base64").toString("utf-8");
          console.log("📥 Donnée reçue :", decodedValue);
          setReceivedData(decodedValue);
            try {
              const jsonData = JSON.parse(decodedValue);
            if (typeof jsonData === "object" && jsonData !== null) {
              const validData = Object.entries(jsonData).reduce((acc, [key, value]) => {
                if (typeof key === "string" && typeof value === "number") {
                  acc[key] = value;
                }
                return acc;
              }, {} as Record<string, number>);

              (async () => {
                await AsyncStorage.setItem("decodedData", JSON.stringify(validData));
              })();
              console.log("Données décodées sauvegardées :", validData);
            } else {
              console.warn("Données reçues ne sont pas un JSON valide :", decodedValue);
            }
          } catch (error) {
            console.error("Erreur lors de la sauvegarde des données décodées :", error);
          }

        }
      }
    );
  };

  const monitorDisconnection = (device: Device) => {
    device.onDisconnected(async () => {
      console.log("Déconnecté ! Tentative de reconnexion...");
      setConnectedDevice(null);
      setBluetoothData({ ...bluetoothData, connected: false });

      storeBluetoothData(bluetoothData || {}); // Sauvegarder les données Bluetooth
      console.log("Données Bluetooth sauvegardées :", bluetoothData);
      //setTimeout(() => tryReconnect(), 5000); // attendre 5 secondes
    });
  };


  const connectToDevice = async (device: Device) => {
    try {
      manager.stopDeviceScan();
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      storeBluetoothId(connected.id, connected.name || "Appareil inconnu", "1.0");
      //await AsyncStorage.setItem('lastDeviceId', connected.id); // <== sauvegarde l'ID
  
      console.log("Connecté à :", connected.name);
      
      monitorData(connected);
      monitorDisconnection(connected);
      setBluetoothData({
        connected: true,
        macAddress: connected.id,
        version: "1.0",
        deviceName: connected.name || "Appareil inconnu",
      });
      console.log("Données Bluetooth :", bluetoothData);
      // Sauvegarder les données Bluetooth
      storeBluetoothData(bluetoothData || {}); // Sauvegarder les données Bluetooth
      console.log("Données Bluetooth sauvegardées :", bluetoothData);
      router.back(); // Retour à l'écran précédent
    } catch (error) {
      console.error("Échec de connexion :", error);
      Alert.alert('Erreur', 'Échec de connexion à l\'appareil Bluetooth ❌');
    }
  };
  

  const disconnectDevice = async () => {
    if (!connectedDevice) return;
    try {
      await manager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setBluetoothData({
        connected: false,
        macAddress: "",
        version: "",
        deviceName: "",
      });
      storeBluetoothData(bluetoothData || {}); // Sauvegarder les données Bluetooth
      console.log("Déconnexion de :", connectedDevice.name);
      storeBluetoothId("", "", ""); // Réinitialiser les données Bluetooth
      console.log("Déconnecté !");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 0 }}>
      <>
      <View style={{ flexDirection: "row", padding: 10, marginBottom: 10, alignItems: "center", justifyContent: "space-between" }}>
      <Text style={styles.text}>Scanner Bluetooth</Text>
      <TouchableOpacity onPress={startScan} disabled={scanning} style={styles.iconButton}>
        {scanning ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : (
          <Ionicons name="refresh-circle" size={24} color="#007bff" />
        )}
      </TouchableOpacity>
    </View>

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => connectToDevice(item)} 
              style={{ padding: 10, marginVertical: 5 }}
            >
              <Text style={{fontFamily:"regular"}}>{item.name || "Appareil inconnu"}</Text>
              <Text style={{fontFamily:"regular"}}>ID: {item.id}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0},
  text: {
    fontSize: 24,
    fontFamily: "bold",
    color: "#333",
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default BLEPage;
