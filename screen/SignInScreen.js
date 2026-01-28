import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UsernameContext, TokenContext } from '../context/Context';
import { signIn } from '../js/sign';

const { width } = Dimensions.get('window');

const SignIn = () => {
  const [username, setUsername] = useContext(UsernameContext);
  const [password, setPassword] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const [erreur, setError] = useState(null);

  const navigation = useNavigation();

  const handleSignIn = () => {
    // On efface l'erreur précédente au clic
    setError(null);
    
    signIn(username, password)
      .then((token) => {
        setToken(token);
        setUsername(username);
      })
      .catch((error) => {
        console.error('Error during sign in:', error.message);
        // Message d'erreur simple, sans le lien de création
        setError('Identifiant ou mot de passe incorrect.');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* --- HEADER (Style identique aux autres pages) --- */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bienvenue</Text>
          <Text style={styles.headerSubtitle}>Connectez-vous à votre espace</Text>
        </View>
      </View>

      {/* --- CARTE DE CONNEXION --- */}
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          
          <Text style={styles.cardTitle}>Connexion</Text>

          {/* Champ Username */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#9FA5AA"
              onChangeText={(text) => setUsername(text)}
              value={username}
              autoCapitalize="none"
            />
          </View>

          {/* Champ Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#9FA5AA"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>

          {/* Message d'erreur (Sans le lien création) */}
          {erreur && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {erreur}</Text>
            </View>
          )}

          {/* Bouton de connexion stylisé */}
          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>SE CONNECTER</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5', // Fond Lavande
  },
  
  // --- HEADER ---
  headerBackground: {
    height: '35%',
    backgroundColor: '#9C27B0', // Violet Principal
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 0,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 5,
  },

  // --- CARD ---
  bottomSection: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    marginTop: -60, // Effet de chevauchement
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 15,
    zIndex: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 30,
  },

  // --- INPUTS ---
  inputContainer: {
    width: '100%',
    backgroundColor: '#F0F4FF',
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#333',
  },

  // --- ERROR ---
  errorBox: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F', // Rouge
    fontWeight: '600',
    textAlign: 'center',
  },

  // --- BUTTON ---
  loginButton: {
    width: '100%',
    backgroundColor: '#9C27B0', // Violet
    paddingVertical: 18,
    borderRadius: 50, // Bouton bien arrondi
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default SignIn;