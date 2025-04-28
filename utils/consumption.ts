import AsyncStorage from '@react-native-async-storage/async-storage';

export const getVoltage = async () => {
  return await AsyncStorage.getItem('v');
};

export const getCurrent = async () => {
    return await AsyncStorage.getItem('c');
};

export const getEnergy = async () => {
    return await AsyncStorage.getItem('e')
}