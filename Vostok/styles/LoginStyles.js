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
  logo: {
    width: 250,
    height: 80,
    resizeMode: 'stretch'
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
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
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
},
  detailContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
});
