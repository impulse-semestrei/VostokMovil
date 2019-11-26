import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'

export default class Checklist extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        text: "",
        materials: null,
        isLoading: true,
        isLast: false,
        isFirst: true,
        isSent: false,
        isReady: false,
        observations: "",
        missing: [],
      }
    }

    componentDidMount(){
      return fetch(this.props.url)
       .then((response) =>response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            materials: responseJson.materiales,
            isLast: false,
            isFirst: true,
            isSent:false,
            isReady: false,
            observations: "",
            missing: [],
          }
        );
        })
        .catch((error) =>{
          console.error(error);
        });
     }

    render(){
      if (this.state.isSent){
        if(!this.state.isReady){
          return(
            <View style={styles.container}>
              <View style={styles.text}>
                <Text style={[styles.text,{marginTop:20, marginBottom:10}]}>La checklist ha sido enviada</Text>
              </View>
              <View>
                <View>
                  <Text style={styles.tableTitle}>Faltantes:</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                  <FlatList
                    data={this.state.missing}
                    renderItem={
                      ({item}) => {
                        return(
                          <View style={styles.missingRow}>
                            <Text style={styles.missingItemData}>{item.nombre}</Text>
                            <Text style={styles.missingItemData}>{item.objetivo - item.cantidad}</Text>
                          </View>
                        )
                      }
                    }
                  />
                </ScrollView>
              </View>
            </View>
          )
        }
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
      this.state.materials.forEach(material => cards.push(material))
      let observationsIndex = this.state.materials.length
      cards.push({"nombre": "observations"})
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
                  if(material.nombre == "observations"){
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
                              defaultValue={this.state.observations}
                              onChangeText={
                                text => {
                                  let copy = this.state
                                  copy.observations = text
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
                                for(let item of copy.materials){
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
                  if(cardIndex == observationsIndex)
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
                async () => {

                  let missing = this.state.materials.filter(material => material.cantidad < material.objetivo)
                  let isReady = missing.length == 0

                  let data = {
                    nombre_paramedico: this.props.nombre_paramedico,
                    email_paramedico: this.props.email_paramedico,
                    materiales: this.state.materials,
                    observaciones: this.state.observations,
                  }

                  console.log(data)
                  console.log(missing)
                  console.log(isReady)

                  await fetch(this.props.url, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });

                  let copy = this.state
                  copy.isSent = true
                  copy.missing = missing
                  copy.isReady = isReady
                  this.setState(copy)
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
  TextBox: {
    backgroundColor: '#E8E8E8',
    justifyContent: 'center'
  },
  objetivo: {
    fontSize: 25,
    color : 'green',
    textAlign:'center',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginLeft: 10,
    marginRight:10,
  },
  textInput: {
    fontSize: 20,
    color: 'black',
  },
  missingItemData: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
    flex:1, 
    alignSelf: 'stretch',
  },
  missingRow: {
    flex:1, 
    flexDirection: 'row',
    borderColor: '#b36217',
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  tableTitle: {
    textAlign: "center",
    fontSize: 40,
  },
  scrollView: {
    backgroundColor: '#e39d5b',
    margin: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b36217',
  }
});
