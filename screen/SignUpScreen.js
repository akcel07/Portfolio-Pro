import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { UsernameContext, TokenContext } from '../context/Context';
import { signUp } from '../js/sign';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // <-- Nouveau champ
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [erreur, setError] = useState(null);

  const handleSignUp = () => {
    setError(null);

    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Vérification que le mot de passe n’est pas vide
    if (!newPassword || !newUsername) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    signUp(newUsername, newPassword)
      .then((newToken) => {
        setToken(newToken);
        setUsername(newUsername);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription:', error.message);
        setError('Ce compte existe déjà.');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* --- HEADER --- */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Inscription</Text>
          <Text style={styles.headerSubtitle}>Rejoignez notre communauté</Text>
        </View>
      </View>

      {/* --- CARTE D'INSCRIPTION --- */}
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          
          <Text style={styles.cardTitle}>Créer un compte</Text>

          {/* Champ Username */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Choisir un identifiant"
              placeholderTextColor="#9FA5AA"
              onChangeText={(text) => setNewUsername(text)}
              value={newUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Champ Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Choisir un mot de passe"
              placeholderTextColor="#9FA5AA"
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              secureTextEntry
            />
          </View>

          {/* Champ Confirmation Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#9FA5AA"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>

          {/* Bouton Inscription */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>S'INSCRIRE</Text>
          </TouchableOpacity>

          {/* Zone Erreur */}
          {erreur && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {erreur}</Text>
            </View>
          )}

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },

  // --- HEADER ---
  headerBackground: {
    height: '35%',
    backgroundColor: '#9C27B0',
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
    marginTop: -60,
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

  // --- BUTTON ---
  signUpButton: {
    width: '100%',
    backgroundColor: '#9C27B0',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // --- ERROR SECTION ---
  errorBox: {
    backgroundColor: '#FFEBEE',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignUpScreen;
