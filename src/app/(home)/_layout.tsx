import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import HomeScreen from "./";
import NotificationScreen from "./notifications";
import AddScreen from "./add";
import EnergyScreen from "./energy";
import ProfileScreen from "./profile";
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { COLORS } from "@/constants";

const Tab = createBottomTabNavigator();

const CustomTabBarButton: React.FC<{ children: React.ReactNode; onPress?: (event: GestureResponderEvent) => void }> = ({ children, onPress }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <View>{children}</View>
  </TouchableOpacity>
);

export default function HomeLayout() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 20,
            right: 20,
            paddingTop: 10,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 65,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
            elevation: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="bell" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({}) => <Icon name="plus-square" size={28} color="#FFF" />,
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Energy"
          component={EnergyScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="zap" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    top: -30,
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.gray2,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
});
