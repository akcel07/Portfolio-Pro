import React, { useEffect, useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, ScrollView, StatusBar, Dimensions, TouchableOpacity 
} from 'react-native';
import { getTodoLists, createTodoList, deleteTodoList } from '../js/todoList';
import { TokenContext, UsernameContext } from '../context/Context';

const { width } = Dimensions.get('window');

export default function TodoListScreen({ navigation }) {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState('');

  const [token, setToken] = useContext(TokenContext);
  const [username, setUsername] = useContext(UsernameContext);

  const avatarLetter = username ? username.charAt(0).toUpperCase() : '?';

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const lists = await getTodoLists(username, token);
        setTodoLists(lists);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todo lists:', error.message);
      }
    };

    fetchTodoLists();
  }, []);

  const handleCreateTodoList = async () => {
    try {
      if (newTodoText.trim() === '') return;
      const newTodoList = await createTodoList(username, newTodoText, token);
      setTodoLists((prevTodoLists) => [...prevTodoLists, newTodoList]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error creating todo list:', error.message);
    }
  };

  const handleDeleteTodoList = async (id) => {
    try {
      const deletedCount = await deleteTodoList(id, token);
      if (deletedCount > 0) setTodoLists(todoLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error('Error deleting todo list:', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9C27B0" />

      {/* --- Header avec Avatar --- */}
      <View style={styles.headerBackground}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Mes TodoLists</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
      </View>

      {/* --- Section TodoLists --- */}
      <ScrollView contentContainerStyle={styles.bottomSection}>
        <FlatList
          data={todoLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoListContainer}>
              <Text style={styles.todoListTitle}>{item.title}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => navigation.navigate('TodoItems', { todoListId: item.id })}
                >
                  <Text style={styles.detailButtonText}>Afficher les détails</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTodoList(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNewTodoText}
            placeholder='Nom de la TodoListe'
            value={newTodoText}
          />
          <TouchableOpacity style={styles.createButton} onPress={handleCreateTodoList}>
            <Text style={styles.createButtonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E5F5' },
  headerBackground: {
    height: '25%',
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
  headerRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  avatarContainer: {
    marginTop: 15,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#9C27B0' },

  bottomSection: { paddingHorizontal: 20, paddingBottom: 20 },
  todoListContainer: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  todoListTitle: { fontSize: 22, marginBottom: 10, fontWeight: 'bold', color: '#6A1B9A' },

  buttonContainer: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  detailButton: {
    flex: 1,
    backgroundColor: '#9C27B0',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  detailButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  deleteButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  inputContainer: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  createButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
