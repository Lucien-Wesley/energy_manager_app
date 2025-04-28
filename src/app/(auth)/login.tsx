import { View, Text, TextInput, ImageBackground, TouchableOpacity, Image, StyleSheet, StatusBar, Alert } from "react-native";
import React, { useState } from 'react'
import { COLORS, images } from '@/constants'
import { Link, Stack, useRouter } from 'expo-router'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { loginUser } from "@/api/authServices";
import { saveAuthToken } from "@/utils/auth";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password }) as { token: string }; // Appel de l'API
      saveAuthToken(data.token); // Stocke le token
      Alert.alert('Connexion réussie', `Bienvenue`);
      router.push('/(home)'); // Redirige l'utilisateur
    } catch (error) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
    }
  };
  

  return (
    <ImageBackground
        source={images.background}
        style={{flex:1}}
    >
        <StatusBar hidden/>
        
        <View style={{ flex:1, flexDirection:'row'}}>
         <Link href={'/(auth)'} asChild>
          <FontAwesome5
            name="chevron-left"
            size={22}
            color="white"
            style={{ marginHorizontal: 15, marginTop:40 }}
          />
        </Link>
        <Text style={{textAlign:'center', fontFamily:'regular', marginTop:40, color:COLORS.secondaryWhite}}>Retour</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue de nouveau</Text>

      {/* Champs du formulaire */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Entrer votre adresse email" keyboardType="email-address" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="Entrer votre mot de passe" secureTextEntry style={styles.input} />
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        
        <Text style={styles.checkboxText}>
          
        </Text>
        <TouchableOpacity style={{ flex:1 }}><Text style={[styles.linkText, {textAlign:'right', flex:1}]}>Mot de passe oublié?</Text></TouchableOpacity>
      </View>

      {/* Bouton d'inscription */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
        <Text style={styles.signUpText}>Connecter</Text>
      </TouchableOpacity>

      {/* Options de connexion */}
      <Text style={styles.socialText}>Se connecter via</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="facebook" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="google" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Lien pour connexion */}
      <Text style={styles.signInText}>
       Vous n'avez pas de compte? <TouchableOpacity style={[styles.signInText, {flex:1}]} onPress={()=>router.push('/(auth)/signup')}><Text style={styles.linkText}>S'Enregistrer</Text></TouchableOpacity>
      </Text>
    </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:COLORS.tertiaryWhite, 
    flex:5, 
    borderTopLeftRadius:20, 
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
  }, 
  title:{
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary,
    //margin: 16,
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
  },
  inputContainer: {
    marginTop: 16,
    fontFamily:'regular'
  },
  label: {
    color: "#4B5563",
    fontFamily:'regular'
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    fontFamily:'regular'
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  checkboxText: {
    marginLeft: 8,
    color: "#6B7280",
    fontFamily: 'regular'
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: "semiBold",
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontFamily: "bold",
    fontSize: 16,
  },
  socialText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
    fontFamily: 'regular'
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  socialIcon: {
    padding: 12,
    backgroundColor: COLORS.secondaryGray,
    borderRadius: 50,
    marginHorizontal: 6,
  },
  signInText: {
    textAlign: "center",
    color: COLORS.gray,
    marginTop: 16,
    fontFamily: 'regular'
  },
})

export default login