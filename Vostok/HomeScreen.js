import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'

export default class HomeScreen extends React.Component {

  constructor(props){
      super(props);
      this.state = {text:'',materiales:null,isLoading:true}




    }

    componentDidMount(){
     return fetch(`http://10.0.2.2:8000/inventario/2/json/`)

       .then((response) =>response.json())

        .then((responseJson) => {

          this.setState({
            isLoading: false,
            materiales: responseJson.materiales
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
                          <TextBox
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
                  let data = {
                    paramedico: "Su Majestad, Eduardo",
                    materiales: this.state.materiales
                  }
                  console.log(data)
                  fetch('http://10.0.2.2:8000/inventario/2/json/', {
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
              backgroundColor={'#4FD0E9'}
              stackSize= {3}>
          </Swiper>
      </View>
    );


    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
