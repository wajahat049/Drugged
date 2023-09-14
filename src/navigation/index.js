import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Diseases from '../screens/Diseases';
import Medicines from '../screens/Medicines';
import Doctors from '../screens/Doctors';
import Stores from '../screens/Stores';

const Stack = createNativeStackNavigator();

export default function Navigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {elevation: 0},
          contentStyle: {
            backgroundColor: 'white',
          },
          // cardStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Diseases"
          component={Diseases}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Medicines"
          component={Medicines}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Doctors"
          component={Doctors}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Stores"
          component={Stores}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
