import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform  } from 'react-native';
import styles from './styles/Menustyles.js';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';

export default class Login extends React.Component {








render(){
  return (

    <ImageBackground source={background} style={styles.container}>
    <Text style={styles.title}>   Checklists   </Text>
    <Text style={styles.num}>  Ambulancia #ID </Text>
    <View style={styles.buttonContainer}>

    <TouchableOpacity style={styles.btnMenu}>
    <Text style={styles.text} > Inventario </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btnMenu}>
    <Text style={styles.text} > Ambulancia </Text>
    </TouchableOpacity>

    </View>


    </ImageBackground>
  );
}
}
