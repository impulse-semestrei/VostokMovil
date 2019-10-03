import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login.js'

const Navigation = createStackNavigator({
  First: {screen: Login,
  navigationOptions: {
    header: null
    }
  },
});

const App = createAppContainer(Navigation);
export default App;
