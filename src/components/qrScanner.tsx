import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

const QRScanner = () => {
  const [scannedData, setScannedData] = useState('');

  const handleScan = (e: { data: string }) => {
    setScannedData(e.data);
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing='back'
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({data}) => {
          console.log("data", data)
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default QRScanner;
