import { COLORS } from '@/constants';
import React from 'react'
import { Switch, View, Text, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface DeviceItem {
  icon: string;
  isOn: boolean;
  name: string;
  power: number;
  hours: number;
}


const DeviceCard = ({ item, onPress }: { item: DeviceItem; onPress: () => void }) => {
  return (
    <View style={styles.deviceCard}>
        <View style={styles.devicesRow}>
            <View style={styles.iconBackground}>
            <Icon name={item.icon} style={styles.icon}/>
            </View>
            <Switch 
                trackColor={{false: '#767577', true: COLORS.secondary}}
                thumbColor={item.isOn? COLORS.primary : '#f4f3f4'} 
                value={item.isOn} 
                style={styles.switch}
                onValueChange={onPress}
            />
        </View>
        <View style={styles.deviceInfo}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.devicePower}>{item.power} kWh</Text>
            <Text style={styles.deviceHours}>{item.hours} hours</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: { backgroundColor: "white", padding: 20, margin: 10, borderRadius: 10, width:"auto" },
    deviceCard: {
        flex: 1, // Pour que les cartes s'adaptent
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 10,
        margin: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        justifyContent: "center",
        elevation: 3, // Ombre pour Android
        minHeight: 180, // Taille fixe pour uniformiser
      },
      devicesRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginTop: 4,
      },
      iconBackground: {
        backgroundColor: COLORS.secondary,
        borderRadius: 30,
        padding: 8,
        marginRight: 10,
      },
      icon:{
        fontSize: 30,
        color: COLORS.primary
      },
      switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
      },
      deviceInfo: {
        marginTop: 20,
      },
      deviceName: {
        fontSize: 14,
        fontFamily: "bold",
        color: "#343a40",
      },
      devicePower: {
        fontSize: 12,
        color: "gray",
        marginTop: 0,
        fontFamily: "regular",
      },
      deviceHours: {
        fontSize: 10,
        color: COLORS.danger,
        marginTop: 0,
        fontFamily: "semiBold",
      }
});

export default DeviceCard
