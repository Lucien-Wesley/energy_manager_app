// Mock data for the application

export interface Device {
  id: string;
  name: string;
  type: string;
  isOn: boolean;
  consumption: number;
  voltage: number;
  current: number;
  roomId: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  devices: string[];
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'error';
  date: string;
  isRead: boolean;
  deviceId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  settings: {
    darkMode: boolean;
    energyCost: number;
    maxConsumption: number;
    units: {
      energy: string;
      voltage: string;
      current: string;
      currency: string;
    };
  };
}

export interface EnergyData {
  date: string;
  consumption: number;
  voltage: number;
  current: number;
}

// Mock rooms
export const rooms: Room[] = [
  { id: '1', name: 'Living Room', devices: ['1', '2', '3'], icon: 'sofa' },
  { id: '2', name: 'Kitchen', devices: ['4', '5', '6'], icon: 'utensils' },
  { id: '3', name: 'Bedroom', devices: ['7', '8'], icon: 'bed' },
  { id: '4', name: 'Bathroom', devices: ['9'], icon: 'droplet' },
  { id: '5', name: 'Office', devices: ['10', '11'], icon: 'briefcase' },
];

// Mock devices
export const devices: Device[] = [
  { id: '1', name: 'TV', type: 'Television', isOn: true, consumption: 120, voltage: 220, current: 0.55, roomId: '1', icon: 'tv' },
  { id: '2', name: 'Light', type: 'Lighting', isOn: true, consumption: 15, voltage: 220, current: 0.07, roomId: '1', icon: 'lamp-desk' },
  { id: '3', name: 'Speaker', type: 'Audio', isOn: false, consumption: 0, voltage: 220, current: 0, roomId: '1', icon: 'speaker' },
  { id: '4', name: 'Refrigerator', type: 'Appliance', isOn: true, consumption: 85, voltage: 220, current: 0.39, roomId: '2', icon: 'refrigerator' },
  { id: '5', name: 'Microwave', type: 'Appliance', isOn: false, consumption: 0, voltage: 220, current: 0, roomId: '2', icon: 'microwave' },
  { id: '6', name: 'Coffee Maker', type: 'Appliance', isOn: true, consumption: 900, voltage: 220, current: 4.09, roomId: '2', icon: 'coffee' },
  { id: '7', name: 'Lamp', type: 'Lighting', isOn: true, consumption: 12, voltage: 220, current: 0.05, roomId: '3', icon: 'lamp' },
  { id: '8', name: 'Air Conditioner', type: 'HVAC', isOn: false, consumption: 0, voltage: 220, current: 0, roomId: '3', icon: 'fan' },
  { id: '9', name: 'Water Heater', type: 'Appliance', isOn: true, consumption: 1500, voltage: 220, current: 6.82, roomId: '4', icon: 'thermometer' },
  { id: '10', name: 'Computer', type: 'Electronics', isOn: true, consumption: 150, voltage: 220, current: 0.68, roomId: '5', icon: 'computer' },
  { id: '11', name: 'Printer', type: 'Electronics', isOn: false, consumption: 0, voltage: 220, current: 0, roomId: '5', icon: 'printer' },
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'High Consumption',
    message: 'Water Heater is consuming more energy than usual.',
    type: 'warning',
    date: '2025-02-28T09:30:00Z',
    isRead: false,
    deviceId: '9',
  },
  {
    id: '2',
    title: 'Device Left On',
    message: 'Coffee Maker has been on for more than 2 hours.',
    type: 'info',
    date: '2025-02-28T08:15:00Z',
    isRead: true,
    deviceId: '6',
  },
  {
    id: '3',
    title: 'Voltage Fluctuation',
    message: 'Unusual voltage detected in Office circuit.',
    type: 'error',
    date: '2025-02-27T22:45:00Z',
    isRead: false,
  },
  {
    id: '4',
    title: 'Energy Saving Tip',
    message: 'Consider turning off your Computer when not in use to save energy.',
    type: 'info',
    date: '2025-02-27T15:00:00Z',
    isRead: true,
    deviceId: '10',
  },
];

// Mock user
export const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  settings: {
    darkMode: false,
    energyCost: 0.15, // cost per kWh in dollars
    maxConsumption: 3000, // kWh
    units: {
      energy: 'kWh',
      voltage: 'V',
      current: 'A',
      currency: '$',
    },
  },
};

// Generate energy data for the past 30 days
export const generateEnergyData = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate some realistic-looking data with weekend peaks
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseConsumption = isWeekend ? 15 + Math.random() * 5 : 10 + Math.random() * 3;
    
    data.push({
      date: date.toISOString(),
      consumption: baseConsumption,
      voltage: 220 + (Math.random() * 10 - 5), // 215-225V
      current: baseConsumption / 220, // I = P/V
    });
  }
  
  return data;
};

export const energyData = generateEnergyData();

// Get total consumption
export const getTotalConsumption = (): number => {
  return devices.reduce((total, device) => total + device.consumption, 0);
};

// Get devices by room
export const getDevicesByRoom = (roomId: string): Device[] => {
  return devices.filter(device => device.roomId === roomId);
};

// Get room by id
export const getRoomById = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};

// Get device by id
export const getDeviceById = (id: string): Device | undefined => {
  return devices.find(device => device.id === id);
};