import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screen/HomeScreen';
import SignInScreen  from '../screen/SignInScreen';
import SignUpScreen  from '../screen/SignUpScreen';
import SignOutScreen from '../screen/SignOutScreen';
import { TokenContext } from '../context/Context';
import DeleteScreen from '../screen/DeleteScreen';
import NavigationTodo from './NavigationTodo';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [token] = useContext(TokenContext);
  
  if (token) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="TodoLists" component={NavigationTodo} />
          <Tab.Screen name="SignOut" component={SignOutScreen} />
          <Tab.Screen name="Delete" component={DeleteScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Sign In" component={SignInScreen} />
          <Tab.Screen name="Sign Up" component={SignUpScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}