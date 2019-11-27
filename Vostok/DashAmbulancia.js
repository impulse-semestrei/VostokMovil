import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from './styles/DashStyles.js';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';
import ambulance from './imagenes/ambulance.png'
import redAmbulance from './imagenes/redAmbulance.png'

export default class Login extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        text:'',
        ambulancias:null,
        isLoading:true
      }
    }

    componentDidMount(){
      return fetch('http://10.0.2.2:8000/ambulancia/json/')
        .then((response) =>response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            ambulancias: responseJson.ambulancias
          });
        })
        .catch((error) =>{
          console.error(error);
        });
    }

  render(){
    if (this.state.isLoading){
      return(
        <Text style={styles.text}>Loading</Text>
      )
    }

    let redirect = (idAmbulancia, idInventario, nombreAmbulancia) => () => {
      this.props.navigation.navigate('Menu', {
        nombre_paramedico: this.props.navigation.getParam('NameOBJ'),
        email_paramedico: this.props.navigation.getParam('EmailOBJ'),
        id_ambulancia: idAmbulancia,
        id_inventario: idInventario,
        nombre_ambulancia: nombreAmbulancia
      });
    }

    let buttonsArray = this.state.ambulancias.map(ambulancia => {
      let ready = ambulancia.inventarioListo && ambulancia.ambulanciaLista
      return(
        <TouchableOpacity key={ambulancia.id}
          onPress = {redirect(ambulancia.id, ambulancia.idInventario, ambulancia.nombre)}
          style={styles.ambulanceContainer} >
          <View style={styles.dir}>
            <Image style={styles.ambulance}
                source={ready? redAmbulance : ambulance}
                resizeMode="contain"
            />
            <Text style={[styles.text, {color: ready?  'red': 'white'}]}> {ambulancia.nombre} </Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (



      <ImageBackground source={background} style={styles.container}>

      <Text style={styles.title}>   Ambulancias   </Text>
      <ScrollView style={styles.scrollView}>
      <View style={styles.buttonContainer}>
        { buttonsArray }
      </View>


      </ScrollView>
      </ImageBackground>

    );
  }
}
