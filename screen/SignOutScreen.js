import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Modal } from 'react-native';
import { TokenContext, UsernameContext } from '../context/Context';

const { width } = Dimensions.get('window');

export default function SignOutScreen() {
    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useContext(UsernameContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // On récupère la première lettre pour l'avatar
    const avatarLetter = username ? username.charAt(0).toUpperCase() : '👋';

    // Fonction de déconnexion
    const handleSignOut = () => {
        setToken(null);
        setUsername(null);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

            {/* --- HEADER (COPIE EXACTE DU DELETE/HOME) --- */}
            <View style={styles.headerBackground}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Déconnexion</Text>
                    <Text style={styles.headerSubtitle}>À bientôt</Text>
                </View>
            </View>

            {/* --- CARTE (COPIE EXACTE DU DELETE/HOME) --- */}
            <View style={styles.bottomSection}>
                <View style={styles.card}>
                    
                    {/* Avatar (COPIE EXACTE) */}
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{avatarLetter}</Text>
                    </View>

                    <Text style={styles.usernameTitle}>{username}</Text>

                    {/* Message d'info (Style InfoBox du Delete) */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                           Ce n'est qu'un au revoir. Revenez-nous vite pour de nouvelles aventures !
                        </Text>
                    </View>
                    
                    {/* Bouton Principal */}
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={() => setShowConfirmation(true)}
                    >
                        <Text style={styles.actionButtonText}>SE DÉCONNECTER</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* --- MODAL DE CONFIRMATION (STYLE HARMONISÉ) --- */}
            <Modal visible={showConfirmation} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        
                        <View style={styles.warningIcon}>
                            <Text style={styles.warningIconText}>🤔</Text>
                        </View>

                        <Text style={styles.modalTitle}>Déjà ?</Text>
                        <Text style={styles.modalMessage}>
                            Voulez-vous vraiment vous déconnecter ?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowConfirmation(false)}
                            >
                                <Text style={styles.cancelButtonText}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleSignOut}
                            >
                                <Text style={styles.confirmButtonText}>Confirmer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },

  // --- HEADER EXACT ---
  headerBackground: {
    height: '35%',
    backgroundColor: '#9C27B0',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 0,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // --- CARTE EXACTE ---
  bottomSection: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    marginTop: -60, // LE MEME QUE DELETE
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

  // --- AVATAR EXACT ---
  avatarContainer: {
    marginTop: -80, // LE MEME QUE DELETE
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9C27B0',
  },

  // --- CONTENU INTERNE ---
  usernameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6A1B9A',
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: '#F3E5F5', // Violet très clair (pas rouge ici)
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0', // Violet
  },
  infoText: {
    color: '#6A1B9A',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // --- BOUTON ---
  actionButton: {
    width: '100%',
    backgroundColor: '#9C27B0',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // --- MODAL (MEME STYLE QUE DELETE) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    elevation: 20,
  },
  warningIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIconText: { fontSize: 30 },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: { backgroundColor: '#ECEFF1' },
  cancelButtonText: { color: '#455A64', fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#9C27B0' },
  confirmButtonText: { color: 'white', fontWeight: 'bold' },
});