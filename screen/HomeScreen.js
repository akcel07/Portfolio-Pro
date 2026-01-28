import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { UsernameContext } from '../context/Context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [username, setUsername] = useContext(UsernameContext);

  const avatarLetter = username ? username.charAt(0).toUpperCase() : '?';
  const today = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('fr-FR', options);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />
      
      {/* --- Header (Structure identique au DeleteScreen) --- */}
      <View style={styles.headerBackground}>
        {/* Container interne pour aligner Titre à gauche et Date à droite */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Mon Espace</Text>
          <Text style={styles.headerDate}>{formattedDate}</Text>
        </View>
      </View>

      {/* --- Carte Principale (Structure identique au DeleteScreen) --- */}
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          
          {/* Avatar (Même style que DeleteScreen) */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>

          <Text style={styles.welcomeLabel}>Prêt à attaquer votre journée ?</Text>
          <Text style={styles.usernameText}>{username}</Text>

          <View style={styles.divider} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  // --- Header Copié du DeleteScreen (avec ajustement row) ---
  headerBackground: {
    height: '35%', // Hauteur identique
    backgroundColor: '#9C27B0',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center', // Centre verticalement
    paddingHorizontal: 25, // Un peu de marge sur les côtés
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 0, // On s'assure qu'il reste derrière
  },
  headerRow: {
    flexDirection: 'row', // Seule différence : on garde la date à droite
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10, // Petit ajustement optique
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26, // Taille adaptée
    fontWeight: 'bold',
  },
  headerDate: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  
  // --- Structure Carte Copiée du DeleteScreen ---
  bottomSection: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    marginTop: -60, // Chevauchement identique au DeleteScreen
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
    zIndex: 10, // On force la carte au-dessus
  },
  
  // --- Avatar Copié du DeleteScreen ---
  avatarContainer: {
    marginTop: -80, // Sortie vers le haut identique
    width: 80, // Taille identique
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4FF', // Fond clair
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#FFF', // Bordure blanche pour couper le header
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C27B0',
  },

  // --- Typographie interne ---
  welcomeLabel: {
    fontSize: 16,
    color: '#6A1B9A',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '600',
    marginTop: 10,
  },
  usernameText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6A1B9A',
    marginBottom: 25,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '60%',
    backgroundColor: '#E1BEE7',
    marginBottom: 10,
  },
});