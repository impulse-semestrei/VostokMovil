import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform  } from 'react-native';

const { width: WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnMenu: {
    marginTop:20,
    marginBottom:50,
    width: 300,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  text :{
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 32,
    textAlign: 'center',
    marginTop:7
},
  title :{
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 55,
    textAlign: 'center',
    marginTop:7,
    fontWeight: 'bold',
  },

  num :{
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
  },

});
