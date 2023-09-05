import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
// import ChildLost from '../screens/ChildLost';
// import ChildFound from '../screens/ChildFound';
// import Result from '../screens/Result';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
// import SingleResult from '../screens/SingleResult';

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
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
