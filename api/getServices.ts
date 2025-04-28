import api from './axiosConfig';



const devicesData = [
    { id: 1, icon: "lamp", name: "Wi-Fi Desk Lamp", isOn: true, power: 10, hours: 5 },
    { id: 2, icon: "speaker", name: "Wireless Speaker", isOn: true, power: 15, hours: 3 },
    { id: 3, icon: "air-purifier", name: "Air Purifier", isOn: false, power: 20, hours: 8 },
    { id: 4, icon: "vacuum", name: "Cleaning Vacuum", isOn: true, power: 25, hours: 2 },
  ];


export const getDevices = async () => {
    try {
        const response = await api.get('/devices');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRooms = async () => {
    try {
        const response = await api.get('/rooms');
        return response.data;
    } catch (error) {
        throw error;
    }
}