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
import InventarioAmbulancia from './InventarioAmbulancia.js'
import Login from './Login.js';
import Menu from './Menu.js';
import DashAmbulancia from './DashAmbulancia';
import EstadoAmbulancia from './EstadoAmbulancia.js';
  const Navigation = createStackNavigator({
    First: {screen: Login,
    navigationOptions: {
      header: null
      }
    },
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
    InventarioAmbulancia: {screen: InventarioAmbulancia,
      navigationOptions: {
        header: null
        }
    },
    EstadoAmbulancia: {screen: EstadoAmbulancia,
      navigationOptions: {
        header: null
        }
    },
});
const App = createAppContainer(Navigation);
export default App;
