/**
 * video-call
 * RootNavigation.js
 * created: 01/01/2022
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../modules';

const Stack = createNativeStackNavigator();

const RootNavigation: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
