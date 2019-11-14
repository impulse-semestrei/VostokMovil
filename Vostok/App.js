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
import Menu from './Menu.js';
import DashAmbulancia from './DashAmbulancia';

  const Navigation = createStackNavigator({
    Ambulancia: {screen: DashAmbulancia,
      navigationOptions: {
        header: null
        }
    },
    Menu: {screen: Menu,
      navigationOptions: {
        header: null
        }
    },
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
