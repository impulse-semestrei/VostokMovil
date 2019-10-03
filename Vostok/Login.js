import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image,TouchableOpacity  } from 'react-native';


//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg'

//logo
import logo from './imagenes/logo.png'
import boton from './imagenes/boton.jpeg'
const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {
  render(){
    return (
      <ImageBackground source={background} style={styles.container}>

      <View style={styles.Imagecontainer}>
        <Image source={logo} style={styles.logo}>
        </Image>
      </View>

      <View style={styles.Botoncontainer}>
      <Image source={boton} style={styles.boton}>
      </Image>
      </View>

      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    justifyContent: 'center',
  },
  backgroundContainer:{
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imagecontainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: 10,
  },
  logo: {
    width: 250,
    height: 80,
    resizeMode: 'stretch'
  },
  Botoncontainer: {
    alignItems: 'center',
    marginBottom: 100,
    marginHorizontal: 30,
  },
  boton: {
    width: 240,
    height: 50,
    resizeMode: 'stretch'
  },
  btnLogin :{
    width: WIDTH - 220,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'rgba(220,20,60,50)',
    marginHorizontal: 109,
    marginTop: 30
  },
  text :{
  color: 'rgba(255,255,255,10)',
  fontSize: 16,
  textAlign: 'center',
  marginTop:10
},
});
