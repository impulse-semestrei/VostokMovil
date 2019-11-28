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
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  text :{
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    textAlign: 'center',

},
  title :{
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 40,
    textAlign: 'center',
    marginTop:50,
    fontWeight: 'bold'
  },
  num :{
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
  },
  ambulance:{
    width:120,
    height:130,
    marginRight:30,
    marginLeft:30,
  },
  ambulanceContainer:{
    marginBottom:null,
    marginTop:null
  },
  scrollView: {
  },
  info: {
    fontWeight: 'bold',
    color: '#ffc1bd',
    fontSize: 15,
    marginBottom:20,
    textAlign: 'center',
    borderWidth: 0.3  ,
    borderColor: '#ffc1bd'
  },
  infoContainer: {
    color: '#ffc1bd',
    borderRadius: 100,
    borderWidth: 100,
    borderColor: 'white'
  },
});
