import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const BottomNav = () => {
  return (
    <View style={styles.container}>
      {/* Icônes gauche */}
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="home" size={24} color="#8E8E93" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="bell" size={24} color="#8E8E93" />
      </TouchableOpacity>

      {/* Bouton central flottant */}
      <TouchableOpacity style={styles.floatingButton}>
        <Icon name="plus-square" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Icônes droite */}
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="zap" size={24} color="#8E8E93" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="user" size={24} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 70,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    top: -30,
    width: 60,
    height: 60,
    backgroundColor: "#2563EB",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
});
