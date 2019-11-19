import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'


export default class EstadoAmbulancia extends React.Component {

  constructor(props){
      super(props);
      this.state = {text:'',materiales:null,isLoading:true}




    }

    componentDidMount(){

      return fetch('http://10.0.2.2:8000/ambulancia/'+this.props.navigation.getParam('id_ambulancia')+'/json/')

       .then((response) =>response.json())

        .then((responseJson) => {

          this.setState({
            isLoading: false,
            materiales: responseJson.elementos
          }
        );

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

      return(
        <View style={styles.container}>
          <Swiper
              cards={this.state.materiales}
              renderCard={(material) => {
                  return (
                      <View style={styles.card}>
                          <Text style={styles.text}>{material.nombre}</Text>
                          <Text style={styles.objetivo}>{"Objetivo:  "+material.objetivo}</Text>
                          <TextBox
                            style={styles.TextBox}
                            objetivo = {material.objetivo}
                            default={material.cantidad+''}
                            onChange={
                              text => {
                                let copy = this.state
                                for(let item of copy.materiales){
                                  if(item.id == material.id){
                                    item.cantidad = parseInt(text)
                                    this.setState(copy)
                                    return
                                  }
                                }
                              }
                            }
                          />
                      </View>
                  )
              }}
              goBackToPreviousCardOnSwipeRight = {true}
              showSecondCard={false}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}


              onSwipedAll={
                () => {
                  return;
                  let data = {
                    nombre_paramedico: this.props.navigation.getParam('nombre_paramedico'),
                    email_paramedico: this.props.navigation.getParam('email_paramedico'),
                    elementos: this.state.materiales
                  }
                  console.log(data)
                  fetch('http://10.0.2.2:8000/ambulancia/'+this.props.navigation.getParam('id_ambulancia')+'/json/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                }
              }
              cardIndex={0}
              backgroundColor={'#e47c1d'}
              stackSize= {3}>
          </Swiper>
      </View>
    );


    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e47c1d"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#F6A02C",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  TextBox:{
    backgroundColor: '#E8E8E8',


  },
  objetivo:{
    fontSize: 30,
    color : 'green',
    textAlign:'center',
  }
});
