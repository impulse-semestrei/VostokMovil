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

    <Text style={styles.num}>  Ambulancia {this.props.navigation.getParam('nombre_ambulancia')}</Text>
    <View style={styles.buttonContainer}>

    <TouchableOpacity
      onPress={
        () => this.props.navigation.navigate('InventarioAmbulancia', {
          nombre_paramedico: this.props.navigation.getParam('nombre_paramedico'),
          email_paramedico: this.props.navigation.getParam('email_paramedico'),
          id_inventario: this.props.navigation.getParam('id_inventario')
        })
      }
      style={styles.btnMenu}  >
      <Text style={styles.text} > Equipo </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={
        () => this.props.navigation.navigate('EstadoAmbulancia', {
          nombre_paramedico: this.props.navigation.getParam('nombre_paramedico'),
          email_paramedico: this.props.navigation.getParam('email_paramedico'),
          id_ambulancia: this.props.navigation.getParam('id_ambulancia')
        })
      }
      style={styles.btnMenu}>
      <Text style={styles.text} > Unidad </Text>
    </TouchableOpacity>

    </View>


    </ImageBackground>
  );
}
}
