import AsyncStorage from '@react-native-async-storage/async-storage';

const BLUETOOTH_DATA_KEY = 'bluetooth_data';

interface BluetoothData {
    connected?: boolean;
    macAddress?: string;
    version?: string;
    deviceName?: string;
}

// Function to store Bluetooth data
export const storeBluetoothData = async (data: BluetoothData): Promise<void> => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(BLUETOOTH_DATA_KEY, jsonData);
    } catch (error) {
        console.error('Error storing Bluetooth data:', error);
    }
};

// Function to store Bluetooth id
export const storeBluetoothId = async (id: string, name:string, version?:string): Promise<void> => {
    try {
        await AsyncStorage.setItem('bluetooth_id', id);
        await AsyncStorage.setItem('bluetooth_name', name);
        if (version) {
            await AsyncStorage.setItem('bluetooth_version', version);
        }
        console.log('Bluetooth ID stored successfully:', id);
    } catch (error) {
        console.error('Error storing Bluetooth ID:', error);
    }
}

// Function to retrieve Bluetooth id
export const getBluetoothId = async (): Promise<{ id: string; name: string; version?: string } | null> => {
    try {
        const id = await AsyncStorage.getItem('bluetooth_id');
        const name = await AsyncStorage.getItem('bluetooth_name');
        const version = await AsyncStorage.getItem('bluetooth_version');

        if (id && name) {
            return { id: id ?? undefined, name: name ?? undefined, version: version ?? undefined };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving Bluetooth ID:', error);
        return null;
    }
}

// Function to retrieve Bluetooth data
export const getBluetoothData = async (): Promise<BluetoothData | null> => {
    try {
        const jsonData = await AsyncStorage.getItem(BLUETOOTH_DATA_KEY);
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving Bluetooth data:', error);
        return null;
    }
};

// Function to clear Bluetooth data
export const clearBluetoothData = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(BLUETOOTH_DATA_KEY);
    } catch (error) {
        console.error('Error clearing Bluetooth data:', error);
    }
};