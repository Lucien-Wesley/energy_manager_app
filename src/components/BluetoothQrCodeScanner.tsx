import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

const BluetoothQRScanner = () => {
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);
  const [scanning, setScanning] = useState(false);

  // Request Bluetooth permissions for Android
//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       ]);

//       if (
//         granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== 'granted' ||
//         granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== 'granted' ||
//         granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== 'granted' ||
//         granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted'
//       ) {
//         Alert.alert('Permissions Required', 'Please grant all permissions for Bluetooth & Camera.');
//         return false;
//       }
//     }
//     return true;
//   };

  // Handle QR Code Scanning
  const onScanSuccess = async (event: any) => {
    const scannedData = event.data;
    console.log('QR Code Data:', scannedData);

    if (!scannedData) {
      Alert.alert('Scan Error', 'No valid Bluetooth address found.');
      return;
    }

    setScanning(true);

    try {
      // Start scanning for Bluetooth devices
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error('Bluetooth Scan Error:', error);
          setScanning(false);
          return;
        }

        // If a device with the scanned MAC address is found, stop scanning and connect
        if (device && device.id === scannedData) {
          manager.stopDeviceScan();
          connectToDevice(device);
        }
      });

      // Stop scanning after 10 seconds if not found
      setTimeout(() => {
        manager.stopDeviceScan();
        setScanning(false);
      }, 10000);
    } catch (error) {
      console.error('Error handling scan:', error);
    }
  };

  // Connect to the Bluetooth device
  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await device.connect();
      setDeviceInfo(connectedDevice);
      Alert.alert('Connected!', `Connected to ${connectedDevice.name || 'Unknown Device'}`);
    } catch (error) {
      console.error('Connection Error:', error);
      Alert.alert('Connection Failed', 'Could not connect to the device.');
    }
    setScanning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code to Connect via Bluetooth</Text>

      {!scanning ? (
        <QRCodeScanner
          onRead={onScanSuccess}
          showMarker
          reactivate={true}
          reactivateTimeout={5000}
          topContent={<Text style={styles.scanText}>Scan a QR Code with a Bluetooth Address</Text>}
        />
      ) : (
        <Text style={styles.scanningText}>Scanning for device...</Text>
      )}

      {deviceInfo && (
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceText}>Connected Device: {deviceInfo.name || 'Unknown'}</Text>
          <Text style={styles.deviceText}>MAC Address: {deviceInfo.id}</Text>
        </View>
      )}

      <Button title="Request Permissions" onPress={()=>{}} />
    </View>
  );
};

export default BluetoothQRScanner;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  scanText: { fontSize: 16, marginBottom: 10 },
  scanningText: { fontSize: 16, fontStyle: 'italic', color: 'blue' },
  deviceInfo: { marginTop: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  deviceText: { fontSize: 16, fontWeight: 'bold' },
});
