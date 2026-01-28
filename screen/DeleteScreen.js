import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Dimensions, StatusBar } from 'react-native';
import { TokenContext, UsernameContext } from '../context/Context';
import API_URL from "../js/apiUrl";

const { width } = Dimensions.get('window');

// --- LOGIQUE API (INCHANGÉE) ---
const DELETE_USER = `
mutation DeleteUser($where:UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}`;

export function deleteUser(username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: { where: { username: username } },
    }),
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) throw jsonResponse.errors[0];
      return jsonResponse.data.deleteUsers.nodesDeleted > 0;
    })
    .catch((error) => {
      console.log('Erreur API:', error.message);
      throw error;
    });
}

export default function DeleteScreen() {
  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const avatarLetter = username ? username.charAt(0).toUpperCase() : '!';

  const handleConfirmDelete = () => {
    setLoading(true);
    deleteUser(username, token)
      .then(() => {
        setToken(null);
        setUsername(null);
        setShowConfirmation(false);
        Alert.alert("Compte supprimé", "Votre compte a été supprimé avec succès.");
      })
      .catch((error) => {
        Alert.alert("Erreur", "Impossible de supprimer le compte.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* --- HEADER (Structure EXACTE du HomeScreen) --- */}
      <View style={styles.headerBackground}>
        {/* On utilise une colonne ici pour Titre + Sous-titre, mais avec les mêmes marges */}
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Paramètres</Text>
          <Text style={styles.headerSubtitle}>Gestion du compte</Text>
        </View>
      </View>

      {/* --- CARTE (Structure EXACTE du HomeScreen) --- */}
      <View style={styles.bottomSection}>
        <View style={styles.card}>
          
          {/* Avatar (Même style) */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>

          <Text style={styles.usernameTitle}>{username}</Text>
          
          {/* Avertissement visible sur la carte */}
          <View style={styles.infoBox}>
            <Text style={styles.warningText}>
              Attention : Cette action est irréversible.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowConfirmation(true)}
          >
            <Text style={styles.deleteButtonText}>SUPPRIMER MON COMPTE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- MODAL DE CONFIRMATION --- */}
      <Modal visible={showConfirmation} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningIconText}>⚠️</Text>
            </View>

            <Text style={styles.modalTitle}>Confirmation requise</Text>
            
            <Text style={styles.modalMessage}>
              Vous êtes sur le point de supprimer <Text style={styles.boldUsername}>{username}</Text>.
            </Text>
            
            {/* Message en ROUGE demandé */}
            <Text style={styles.modalMessageDanger}>
              Toutes vos données seront définitivement perdues.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowConfirmation(false)}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmDelete}
                disabled={loading}
              >
                <Text style={styles.confirmButtonText}>
                  {loading ? "..." : "Confirmer"}
                </Text>
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
  
  // --- HEADER (Copie Conforme HomeScreen) ---
  headerBackground: {
    height: '35%', // Hauteur identique
    backgroundColor: '#9C27B0',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center', 
    alignItems: 'center', // Centré
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
    marginBottom: 10, // Petit ajustement pour remonter le texte au dessus de la carte
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

  // --- STRUCTURE CARTE (Copie Conforme HomeScreen) ---
  bottomSection: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    marginTop: -60, // Chevauchement identique
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

  // --- AVATAR (Copie Conforme HomeScreen) ---
  avatarContainer: {
    marginTop: -80, // Sortie identique
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

  // --- CONTENU SPÉCIFIQUE DELETE ---
  usernameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6A1B9A',
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: '#FFEBEE', // Fond rouge très pâle
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F', // Barre rouge
  },
  warningText: {
    color: '#D32F2F', // Texte ROUGE
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  deleteButton: {
    width: '100%',
    backgroundColor: '#9C27B0', // Bouton Violet (Harmonie)
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // --- STYLES DE LA MODAL ---
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
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIconText: { fontSize: 30 },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F', // Titre rouge alerte
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalMessageDanger: {
    fontSize: 15,
    color: '#D32F2F', // ROUGE demandé
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  boldUsername: { fontWeight: 'bold', color: '#6A1B9A' },
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
  confirmButton: { backgroundColor: '#D32F2F' },
  confirmButtonText: { color: 'white', fontWeight: 'bold' },
});