/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen.js'
import Login from './Login.js';


  const Navigation = createStackNavigator({
    First: {screen: Login,
    navigationOptions: {
      header: null
      }
    },
    HomeScreen: {screen: HomeScreen,
      navigationOptions: {
        header: null
        }
    },
});
const App = createAppContainer(Navigation);
export default App;
