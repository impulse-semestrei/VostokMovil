import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import Swiper from 'react-native-deck-swiper'

export default class HomeScreen extends React.Component {

  constructor(props){
      super(props);
      this.state = {text:'',materiales:null,isLoading:true}




    }

    componentDidMount(){
     return fetch(`http://localhost:8000/inventario/1/json/`)

       .then((response) =>response.json())

        .then((responseJson) => {

          this.setState({
            isLoading: false,
            materiales: responseJson.materiales,
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
                          <Text style={styles.text}>{material.cantidad}</Text>

                      </View>
                  )
              }}
              goBackToPreviousCardOnSwipeRight = {true}
              showSecondCard={false}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              stackSize= {3}>
              <Button
                  onPress={() => {console.log('oulala')}}
                  title="Press me">
                  You can press me
              </Button>
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
