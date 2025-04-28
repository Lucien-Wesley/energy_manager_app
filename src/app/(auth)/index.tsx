import { useColorScheme } from '@/hooks/useColorScheme.web';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Colors } from '@/constants/Colors';
import { COLORS, images } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { FONTS } from '@/constants/font';
import { useRouter } from 'expo-router';


export default function WelcomeScreen () {
  const router = useRouter()
  return (
    <ImageBackground
      source={images.background}
      style={{flex:1}}
    >
      <StatusBar hidden/>
      <View style={{flex:9, padding: 16, marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={[styles.regular, {color:COLORS.secondaryWhite}]}>Profiter de l'application Energy Copilot</Text><Text style={[styles.regular, {color:COLORS.secondaryGray}]}>Pour une bonne gestion de votre consommation électrique</Text>
      </View>
      <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', width:'50%'}}>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={[styles.regular, {color:COLORS.secondaryWhite}]}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, alignItems: 'center', width:'50%', justifyContent: 'center', backgroundColor:COLORS.tertiaryWhite, borderTopLeftRadius:30}}>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={[styles.regular, {color:COLORS.primary}]}>S'Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title:{
    fontSize: 36,
    textAlign: 'center',
    color: COLORS.secondaryWhite,
    margin: 16,
    fontFamily: "bold"
  },
  regular:{
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'semiBold'
  },
  mytext:{
    fontSize: 12,
    textAlign:'center',
    fontFamily: 'regular'
  }
})



