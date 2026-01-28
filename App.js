import React ,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TokenContext,UsernameContext } from './context/Context'; 
import TodoList from './components/TodoList';
import Navigation from './navigation/Navigation';


export default function App() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
