import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from './styles/DashStyles.js';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';
import ambulance from './imagenes/ambulance.png'

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
      let ambulanciasArray = [
        {
         id: 1,
         idInventario: 1
        },
        {
         id: 3,
         idInventario: 3
        },
        {
         id: 4,
         idInventario: 4
        },
        {
         id: 2,
         idInventario: 2
        }
      ];


      // fetch

      this.setState({
        isLoading: false,
        ambulancias: ambulanciasArray
      });
    }

/*
      return fetch(`http://10.0.2.2:8000/inventario/4/json/`)

       .then((response) =>response.json())

        .then((responseJson) => {



        })
        .catch((error) =>{
          console.error(error);
        });


*/







render(){
  if (this.state.isLoading){
    return(
      <Text style={styles.text}>Loading</Text>
    )
  }

  let redirect = (idAmbulancia, idInventario) => () => {
    this.props.navigation.navigate('Menu', {
      nombre_paramedico: this.props.navigation.getParam('NameOBJ'),
      email_paramedico: this.props.navigation.getParam('EmailOBJ'),
      id_ambulancia: idAmbulancia,
      id_inventario: idInventario
    });
  }

  let buttonsArray = [];
  this.state.ambulancias.forEach(
    (ambulancia) => {
      buttonsArray.push(
        <TouchableOpacity key={ambulancia.id}
          onPress = {redirect(ambulancia.id, ambulancia.idInventario)}
          style={styles.ambulanceContainer} >
          <View style={styles.dir}>
            <Image style={styles.ambulance}
                source={ambulance}
                resizeMode="contain"
            />
            <Text style={styles.text}> {ambulancia.id}   </Text>
          </View>
        </TouchableOpacity>
      )
    }
  );
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
