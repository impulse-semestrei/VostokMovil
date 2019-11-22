import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'


export default class Checklist extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        text:"",
        materiales:null,
        isLoading:true,
        isLast:false,
        isFirst:true,
        isSent:false,
        observaciones:""
      }
    }

    componentDidMount(){
      return fetch(this.props.url)
       .then((response) =>response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            materiales: responseJson.materiales,
            isLast: false,
            isFirst: true,
            isSent:false,
            observaciones:""
          }
        );
        })
        .catch((error) =>{
          console.error(error);
        });
     }

    render(){
      if (this.state.isSent){
        return(
          <View style={styles.container}>
            <View style={styles.statusMessage}>
              <Text style={styles.text}>Se ha enviado la checklist</Text>
            </View>
          </View>
        )
      }
      if (this.state.isLoading){
        return(
          <View style={styles.container}>
              <Text style={styles.statusMessage}>Cargando...</Text>
          </View>
        )
      }
      let cards = []
      this.state.materiales.forEach(material => cards.push(material))
      let observacionesIndex = this.state.materiales.length
      cards.push({"nombre": "observaciones"})
      cards.push({"nombre": "last"})
      return(
        <View style={styles.container}>
          <Swiper
              cards={cards}
              disableRightSwipe = {this.state.isFirst}
              disableTopSwipe = {!this.state.isLast}
              disableBottomSwipe = {true}
              disableLeftSwipe = {this.state.isLast}
              renderCard={(material) => {
                  if(material.nombre == "last"){
                    return(
                      <View style={styles.card}>
                          <Text style={styles.text}>Desliza hacia arriba para enviar la checklist</Text>
                      </View>
                    )
                  }
                  if(material.nombre == "observaciones"){
                    return(
                      <View style={styles.card}>
                          <Text style={styles.text}>Observaciones Generales</Text>
                          <View style={styles.textInputContainer}>
                            <TextInput
                              style={styles.textInput}
                              multiline={true}
                              placeholder={'Escribe aqui'}
                              maxLength={250}
                              numberOfLines={3}
                              onChangeText={
                                text => {
                                  let copy = this.state
                                  copy.observaciones = text
                                  this.setState(copy)
                                }
                              }

                            />
                        </View>
                      </View>
                    )
                  }
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
              onSwipedLeft={
                (cardIndex) => {
                  console.log('swipeleft')
                  let copy = this.state
                  copy.isLast = false
                  copy.isFirst = false
                  if(cardIndex == observacionesIndex)
                    copy.isLast = true
                  this.setState(copy)
                }
              }
              onSwipedRight={
                (cardIndex) => {
                  console.log('swiperight')
                  let copy = this.state
                  copy.isFirst = false
                  copy.isLast = false
                  if(cardIndex == 1)
                    copy.isFirst = true
                  this.setState(copy)
                }
              }
              onSwipedAll={
                () => {
                  let data = {
                    nombre_paramedico: this.props.nombre_paramedico,
                    email_paramedico: this.props.email_paramedico,
                    materiales: this.state.materiales,
                    observaciones: this.state.observaciones
                  }

                  console.log(data)

                  let copy = this.state
                  copy.isSent = true
                  this.setState(copy)

                  fetch(this.props.url, {
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
  statusMessage: {
    flex: 1,
    justifyContent: "center"
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
    fontSize: 55,
    backgroundColor: "transparent"
  },
  TextBox:{
    backgroundColor: '#E8E8E8',
    justifyContent: 'center'
  },
  objetivo:{
    fontSize: 25,
    color : 'green',
    textAlign:'center',
  },
  textInputContainer:{
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginLeft: 10,
    marginRight:10,
  },
  textInput:{
    fontSize: 20,
    color : 'black',

  }
});
