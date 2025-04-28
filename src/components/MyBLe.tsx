import React, { useEffect, useState, useRef } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, PermissionsAndroid, Platform 
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { Buffer } from "buffer";

const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-abcdef123456";

const MyBLE: React.FC = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState<Device[]>([]);
  const devicesRef = useRef<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [command, setCommand] = useState("");
  const [receivedData, setReceivedData] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
    };
    initialize();

    return () => {
      console.log("Nettoyage du Bluetooth...");
      manager.stopDeviceScan();
      manager.destroy();
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

    console.log("Scanning Bluetooth ...");
    setDevices([]); 
    devicesRef.current = []; 

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (device?.name && !devicesRef.current.find((d) => d.id === device.id)) {
        devicesRef.current.push(device);
        setDevices([...devicesRef.current]); 
      }
    });

    setTimeout(() => manager.stopDeviceScan(), 5000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      manager.stopDeviceScan();
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log("Connecté à :", connected.name);

      // Activer la réception automatique des données BLE
      await manager.monitorCharacteristicForDevice(
        connected.id,
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
          }
        }
      );

      const subscription = manager.onDeviceDisconnected(connected.id, () => {
        console.log("L'appareil s'est déconnecté !");
        setConnectedDevice(null);
      });

      return () => subscription.remove();
    } catch (error) {
      console.error("Échec de connexion :", error);
    }
  };

  const disconnectDevice = async () => {
    if (!connectedDevice) return;
    try {
      await manager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      console.log("Déconnecté !");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  const sendCommand = async () => {
    if (!connectedDevice) return;
    try {
      const commandBase64 = base64.encode(command);
      await manager.writeCharacteristicWithoutResponseForDevice(
        connectedDevice.id,
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        commandBase64
      );
      console.log("Commande envoyée :", command);
    } catch (error) {
      console.error("Échec d'envoi :", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {connectedDevice ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Connecté à {connectedDevice.name}
          </Text>
          <TextInput
            placeholder="Entrez une commande..."
            value={command}
            onChangeText={setCommand}
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <TouchableOpacity onPress={sendCommand} style={{ padding: 10, backgroundColor: "green" }}>
            <Text style={{ color: "white", textAlign: "center" }}>Envoyer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={disconnectDevice} style={{ padding: 10, backgroundColor: "red", marginTop: 10 }}>
            <Text style={{ color: "white", textAlign: "center" }}>Déconnecter</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20, fontSize: 16 }}>📡 Donnée reçue : {receivedData || "Aucune donnée pour le moment..."}</Text>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={startScan} style={{ padding: 10, backgroundColor: "blue", marginBottom: 10 }}>
            <Text style={{ color: "white", textAlign: "center" }}>Scanner Bluetooth</Text>
          </TouchableOpacity>

          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => connectToDevice(item)} 
                style={{ padding: 10, backgroundColor: "#ddd", marginVertical: 5 }}
              >
                <Text>{item.name || "Appareil inconnu"}</Text>
                <Text>ID: {item.id}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

export default MyBLE;
