import { COLORS } from "@/constants";
import WeatherComponent from "@/src/components/WeatherComponent";
import React, { useState } from "react";
import { StyleSheet, ScrollView, useColorScheme, Switch, TextInput, Platform } from 'react-native';
import { View } from '@/src/components/themedView';
import { Text } from '@/src/components/themedText';
import Button from '@/src/components/button';
import Card from '@/src/components/card';
import { user as initialUser } from '@/constants/MockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS as colors } from '@/constants';
import { User, Mail, Lock, Moon, DollarSign, Zap, LogOut, ChevronRight, Settings, CircleHelp as HelpCircle, Bell } from 'lucide-react-native';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  
  const [user, setUser] = useState(initialUser);
  const [energyCost, setEnergyCost] = useState(user.settings.energyCost.toString());
  const [maxConsumption, setMaxConsumption] = useState(user.settings.maxConsumption.toString());
  
  const handleLogout = () => {
    // In a real app, this would log the user out
    alert('User logged out successfully!');
  };
  
  const updateSettings = () => {
    // In a real app, this would update the user's settings in the database
    setUser({
      ...user,
      settings: {
        ...user.settings,
        energyCost: parseFloat(energyCost),
        maxConsumption: parseFloat(maxConsumption),
      }
    });
    
    alert('Settings updated successfully!');
  };
  return (
    <ScrollView style={styles.container}>
      <WeatherComponent />
      <View style={styles.header}>
        <Text style={styles.text}>Profile</Text>
      </View>
      
      <View 
        style={styles.scrollContent}
      >
        {/* User Info Card */}
        <Card style={styles.userCard}>
          <View style={styles.userInfoContainer} bg="white">
            <View 
              style={[
                styles.avatarContainer, 
                { backgroundColor: colors.primary + '20' }
              ]} 
              bg="white"
            >
              <Text style={[styles.ntext]} >
                {user.name.charAt(0)}
              </Text>
            </View>
            
            <View style={styles.userInfo} bg="white">
              <Text style={styles.stext}>
                {user.name}
              </Text>
              <Text style={[styles.mtext, { color: colors.gray2 }]}>
                {user.email}
              </Text>
            </View>
            
            <Button 
              title="Edit" 
              variant="outline" 
              size="md" 
            />
          </View>
        </Card>
        
        {/* Settings Card */}
        <Text style={[styles.sectionTitle, styles.stext]}>
          Settings
        </Text>
        
        <Card style={styles.settingsCard}>
          <View style={styles.settingItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.secondary + '20' }]} 
                bg="white"
              >
                <Moon size={20} color={colors.secondary} />
              </View>
              <Text style={styles.mtext}>Dark Mode</Text>
            </View>
            
            <Switch
              value={user.settings.darkMode}
              onValueChange={(value) => setUser({
                ...user,
                settings: {
                  ...user.settings,
                  darkMode: value,
                }
              })}
              trackColor={{ false: colors.secondaryGray, true: Platform.OS === 'ios' ? colors.primary : colors.primary + '80' }}
              thumbColor={Platform.OS === 'ios' ? 'white' : user.settings.darkMode ? colors.primary : colors.gray}
              ios_backgroundColor={colors.gray2}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]} 
                bg="white"
              >
                <DollarSign size={20} color={colors.primary} />
              </View>
              <Text style={styles.mtext}>Energy Cost ({user.settings.units.currency}/kWh)</Text>
            </View>
            
            <TextInput
              style={[
                styles.settingInput,
                { color: colors.black, borderColor: colors.tertiaryWhite}
              ]}
              value={energyCost}
              onChangeText={setEnergyCost}
              keyboardType="decimal-pad"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.warning + '20' }]} 
                bg="white"
              >
                <Zap size={20} color={colors.warning} />
              </View>
              <Text style={styles.mtext}>Max Consumption (W)</Text>
            </View>
            
            <TextInput
              style={[
                styles.settingInput,
                { color: colors.black, borderColor: colors.tertiaryWhite }
              ]}
              value={maxConsumption}
              onChangeText={setMaxConsumption}
              keyboardType="decimal-pad"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingButtonContainer} bg="white">
            <Button 
              title="Save Settings" 
              onPress={updateSettings}
              fullWidth
            />
          </View>
        </Card>
        
        {/* More Options */}
        <Text style={[styles.sectionTitle, styles.stext]}>
          More
        </Text>
        
        <Card style={styles.moreCard}>
          <View style={styles.moreItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.secondary + '20' }]} 
                bg="white"
              >
                <Settings size={20} color={colors.secondary} />
              </View>
              <Text style={styles.mtext}>App Settings</Text>
            </View>
            
            <ChevronRight size={20} color={colors.secondaryGray} />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.moreItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.info + '20' }]} 
                bg="white"
              >
                <Bell size={20} color={colors.info} />
              </View>
              <Text style={styles.mtext}>Notification Preferences</Text>
            </View>
            
            <ChevronRight size={20} color={colors.secondaryGray} />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.moreItem} bg="white">
            <View style={styles.settingLeft} bg="white">
              <View 
                style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]} 
                bg="white"
              >
                <HelpCircle size={20} color={colors.primary} />
              </View>
              <Text style={styles.mtext}>Help & Support</Text>
            </View>
            
            <ChevronRight size={20} color={colors.secondaryGray} />
          </View>
        </Card>
        
        {/* Logout Button */}
        <View style={{paddingHorizontal:100}}>
          <Button 
            title="Log Out" 
            variant="outline"
            leftIcon={<LogOut size={20} color={colors.error} />}
            textColor={colors.error}
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}
  
  

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryWhite, padding: 0},
  text: {
    fontSize: 24,
    fontFamily: "bold",
    color: "#333",
  },
  mtext: {
    fontSize: 14,
    fontFamily: "regular",
    color: "#333",
  },
  ntext: {
    fontSize: 28,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  stext: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: "#333",
  },
  
  header: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: COLORS.secondaryWhite,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    backgroundColor: COLORS.secondaryWhite,
  },
  userCard: {
    marginBottom: 14,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 10,
    fontFamily: "semibold",
    fontSize: 18,
  },
  settingsCard: {
    marginBottom: 14,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  settingInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 80,
    textAlign: 'center',
    fontFamily: "regular",
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 40 + 10,
  },
  settingButtonContainer: {
    padding: 10,
  },
  moreCard: {
    marginBottom: 14,
  },
  moreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 16,
  },
});
