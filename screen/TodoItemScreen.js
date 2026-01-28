import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
// J'importe Ionicons pour l'icone crayon (standard Expo)
import { Ionicons } from '@expo/vector-icons'; 
import { getTodos, createTodo, updateTodo, deleteTodo } from '../js/todo';
import { TokenContext, UsernameContext } from '../context/Context';
import * as ImagePicker from 'expo-image-picker';

const CLOUD_NAME = 'djas8tdcq'; 
const PRESET = 'akcel07'; 

const uploadToCloudinary = async (imageAsset) => {
  if (!imageAsset) return null;

  let fileToSend;
  if (Platform.OS === 'web') {
    if (!imageAsset.base64) {
      console.log("Erreur: Pas de base64 généré");
      return null;
    }
    fileToSend = `data:image/jpeg;base64,${imageAsset.base64}`;
  } else {
    let filename = imageAsset.uri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image/jpeg`;
    fileToSend = { uri: imageAsset.uri, name: filename, type: type };
  }

  const data = new FormData();
  data.append('upload_preset', PRESET);
  data.append('cloud_name', CLOUD_NAME);
  data.append('file', fileToSend);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });
    const json = await response.json();
    if (json.error) {
      Alert.alert("Erreur Cloudinary", json.error.message);
      return null;
    }
    return json.secure_url; 
  } catch (error) {
    Alert.alert("Erreur", error.message);
    return null;
  }
};

const pickImage = async (setSelectedImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.5,
    base64: true,
  });
  if (!result.canceled) {
    setSelectedImage(result.assets[0]);
  }
};

export default function TodoItemScreen({ route }) {
  const { todoListId } = route.params;
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // --- NOUVEAUX ÉTATS POUR LA MODIFICATION ---
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [token] = useContext(TokenContext);
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoListTodos = await getTodos(todoListId, token);
        setTodos(todoListTodos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };
    fetchTodos();
  }, [todoListId]);

  const handleCreateTodo = async () => {
    if (newTodoText.trim() === '') return;
    let contentToSend = newTodoText;

    if (selectedImage) {
      const imageUrl = await uploadToCloudinary(selectedImage);
      if (imageUrl) {
        contentToSend = `${contentToSend}###${imageUrl}`;
      } else {
        Alert.alert("Erreur", "L'image n'a pas pu être uploadée.");
        return;
      }
    }

    try {
      const newTodo = await createTodo(contentToSend, todoListId, token);
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const handleUpdateTodo = async (id, done) => {
    try {
      const currentTodo = todos.find(t => t.id === id);
      await updateTodo(id, currentTodo.content, done, token);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  // --- LOGIQUE DE MODIFICATION DU TEXTE ---
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.content.split("###")[0]);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

const saveEditing = async (id, currentDone, fullContent) => {
  if (editingText.trim() === '') return;

  const parts = fullContent.split("###");
  const imagePart = parts.length > 1 ? parts[1] : null;

  let newContent = editingText; // Texte modifié
  if (imagePart) {
    newContent = `${newContent}###${imagePart}`; // Si une image existe, on l'ajoute au contenu
  }

  console.log('Contenu à envoyer pour la modification:', newContent);  // Log du texte final

  try {
    // Mise à jour uniquement du texte et de l'état done (boolean)
    const updatedTodo = await updateTodo(id, newContent, currentDone, token); 
    
    console.log('Réponse API après modification:', updatedTodo);  // Vérifie la réponse de l'API

    // Mise à jour de l'état local
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );

    setEditingId(null); // Annule le mode édition
    setEditingText(''); // Réinitialise le champ de texte
  } catch (error) {
    console.error("Erreur update texte:", error);
    Alert.alert("Erreur", "Impossible de modifier");
  }
};



  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, token);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleCheckAll = async () => {
    try {
      const updatedTodos = await Promise.all(
        todos.map(async (todo) => {
          await updateTodo(todo.id, todo.content, true, token);
          return { ...todo, done: true };
        })
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todos:', error.message);
    }
  };

  const handleCheckNone = async () => {
    try {
      const updatedTodos = await Promise.all(
        todos.map(async (todo) => {
          await updateTodo(todo.id, todo.content, false, token);
          return { ...todo, done: false };
        })
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todos:', error.message);
    }
  };

  const completedTasksCount = todos.filter((todo) => todo.done).length;
  const totalTasksCount = todos.length;
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />
      
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Mes Tâches</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              {`${completedTasksCount}/${totalTasksCount} tâches complétées`}
            </Text>
            <Text style={styles.progressPercentage}>
              {`${Math.round(progressPercentage)}%`}
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const parts = item.content.split("###");
          const textPart = parts[0];
          const imagePart = parts.length > 1 ? parts[1].trim() : null; 
          const isEditing = editingId === item.id;

          return (
            <View style={styles.todoItemContainer}>
              {isEditing ? (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput 
                      style={[styles.input, {marginRight: 5, height: 40}]} 
                      value={editingText}
                      onChangeText={setEditingText}
                      autoFocus
                  />
                  <TouchableOpacity onPress={() => saveEditing(item.id, item.done, item.content)}>
                      <Ionicons name="checkmark-circle" size={30} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={cancelEditing}>
                      <Ionicons name="close-circle" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={{flex: 1}}>
                      <Text
                        style={[
                          styles.todoItemText,
                          { 
                            textDecorationLine: item.done ? 'line-through' : 'none',
                            color: item.done ? '#888' : '#6A1B9A'
                          },
                        ]}
                      >
                        {textPart}
                      </Text>
                      {imagePart && (
                        <Image 
                          source={{ uri: imagePart }} 
                          style={styles.todoImage} 
                        />
                      )}
                  </View>
                  
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => startEditing(item)} style={{marginRight: 10}}>
                      <Ionicons name="pencil" size={24} color="#1976D2" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                      <Image
                        source={require('../assets/trash-can-outline.png')}
                        style={styles.trashIcon}
                      />
                    </TouchableOpacity>
                    
                    <Switch
                      value={item.done}
                      onValueChange={(value) => handleUpdateTodo(item.id, value)}
                      trackColor={{ false: '#ccc', true: '#9C27B0' }}
                      thumbColor={item.done ? '#6A1B9A' : '#FFF'}
                    />
                  </View>
                </>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
            <Text style={styles.emptySubtext}>Ajoutez votre première tâche ci-dessous</Text>
          </View>
        }
      />
      {/* Formulaire de création de tâche */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.selectImageButton} onPress={() => pickImage(setSelectedImage)}>
          <Text style={styles.selectImageButtonText}>Ajouter une image</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={setNewTodoText}
          placeholder='Saisissez le nom de la tâche'
          value={newTodoText}
        />
        
        <TouchableOpacity style={styles.createButton} onPress={handleCreateTodo}>
          <Text style={styles.createButtonText}>Créer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckAll}>
          <Text style={styles.checkButtonText}>Tout cocher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckNone}>
          <Text style={styles.checkButtonText}>Tout décocher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3E5F5' 
  },
  headerBackground: {
    backgroundColor: '#9C27B0',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 20,
  },
  headerTitle: { 
    color: '#FFF', 
    fontSize: 26, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginTop: 5,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  listContainer: { 
    paddingHorizontal: 16, 
    paddingBottom: 20,
    flexGrow: 1,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  todoItemText: { 
    flex: 1, 
    fontSize: 16, 
    fontWeight: '600',
    marginRight: 10,
  },
  itemActions: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  trashIcon: { 
    width: 22, 
    height: 22, 
    marginRight: 12,
    tintColor: '#D32F2F'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 16,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
    marginRight: 10, 
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  checkButton: {
    flex: 1,
    backgroundColor: '#6A1B9A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  selectImageButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10, 
  },
  selectImageButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});