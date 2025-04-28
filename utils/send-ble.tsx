import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import { getBluetoothId } from './bluetooth-connect';

const manager = new BleManager();

const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHARACTERISTIC_UUID = "abcd1234-ab12-cd34-ef56-abcdef123456";

export const sendCommand = async (
    deviceId: string,
    command: string,
    commandType: string
): Promise<void> => {
    const bleId = await getBluetoothId();

    const { id } = bleId || {};
    //console.log(id)
    if (!id) {
        console.error("ID is undefined");
        return;
    }

    try {
        const commandBase64 = base64.encode(`CMD:"id":${deviceId}:"state":${command}`);
        await manager.writeCharacteristicWithoutResponseForDevice(
            id,
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            commandBase64
        );
        console.log("Commande envoyée :", deviceId);
    } catch (error) {
        console.error("Échec d'envoi :", error);
    }
};

export const configWifi = async (
    ssid: string,
    password: string,
): Promise<void> => {
    const bleId = await getBluetoothId();

    const { id } = bleId || {};
    //console.log(id)
    if (!id) {
        console.error("ID is undefined");
        return;
    }

    try {
        const commandBase64 = base64.encode(`WIFI:${ssid}|${password}`);
        await manager.writeCharacteristicWithoutResponseForDevice(
            id,
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            commandBase64
        );
        console.log("Wifi Config envoyé :", ssid, password);
    } catch (error) {
        console.error("Échec d'envoi :", error);
    }
}