import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native';
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
      return fetch('https://rescate1app.com/ambulancia/json/')
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

    let confirmation = (idAmbulancia, idInventario, nombreAmbulancia) => () => {
      Alert.alert(
        'Confirmación',
        'Esta ambulancia se usó recientemente ¿Seguro que quieres utilizarla?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Si', onPress: redirect(idAmbulancia, idInventario, nombreAmbulancia)},
        ],
        {cancelable: false},
      );
    }

    let buttonsArray = this.state.ambulancias.map(ambulancia => {
      let inactive = ambulancia.inventarioListo && ambulancia.ambulanciaLista
      return(
        <TouchableOpacity key={ambulancia.id}
        //  onPress = {redirect(ambulancia.id, ambulancia.idInventario, ambulancia.nombre)}
            onPress = {inactive? confirmation(ambulancia.id, ambulancia.idInventario, ambulancia.nombre) : redirect(ambulancia.id, ambulancia.idInventario, ambulancia.nombre)}
          style={styles.ambulanceContainer} >
          <View style={styles.dir}>
            <Image style={styles.ambulance}
                source={inactive? redAmbulance : ambulance}
                resizeMode="contain"
            />
            <Text style={[styles.text, {color: inactive?  '#f29191': 'white'}]}> {ambulancia.nombre} </Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <ImageBackground source={background} style={styles.container}>

      <Text style={styles.title}>   Unidades   </Text>
      <ScrollView style={styles.scrollView}>
      <View style={styles.buttonContainer}>
        { buttonsArray }

      </View>


      </ScrollView>
        <Text style={styles.info}> Las unidades en rojo fueron utilizadas recientemente </Text>
      </ImageBackground>

    );
  }
}
