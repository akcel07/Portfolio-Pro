import React from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack';


import TodoListScreen from '../screen/TodoListScreen.js'
import TodoItemScreen from '../screen/TodoItemScreen.js'

const Stack = createNativeStackNavigator();

export default function NavigationTodo() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TodoLists' component={TodoListScreen} /> 
        <Stack.Screen name='TodoItems' component={TodoItemScreen} /> 
      </Stack.Navigator>
    );
}