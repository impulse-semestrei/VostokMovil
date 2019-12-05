import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput,TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'
import background from './imagenes/home_background.jpg';
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
        submitPending: false,
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
            submitPending: false,
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
          let items = this.state.missing.map(item => {
            return(
              <View key={item.id} style={styles.missingRow}>
                <Text style={styles.missingItemData}>{item.nombre}</Text>
                <Text style={styles.missingItemData}>{item.objetivo - item.cantidad}</Text>
              </View>
            )
          })
          return(
            <ImageBackground source={background} style={styles.container}>
              <View style={styles.container}>
                <View style={styles.text}>
                  <Text style={[styles.statusText,{marginTop:20, marginBottom:10}]}>Se ha enviado la checklist</Text>
                </View>
                <View style={{flex:3, flexDirection:"column"}}>
                  <View>
                    <Text style={styles.tableTitle}>Faltantes:</Text>
                  </View>
                  <ScrollView style={styles.scrollView}>
                    {items}
                  </ScrollView>
                </View>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={this.props.onBack}
                  >
                    <Text style={styles.buttonText}> Entendido </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </ImageBackground>
          )
        }
        return(
          <ImageBackground source={background} style={styles.container}>
            <View style={styles.container}>
              <View style={styles.statusMessage}>
                <Text style={styles.statusText}>Se ha enviado la checklist</Text>
              </View>
              <View style={styles.backButtonContainer}>
                <Button
                  buttonStyle={styles.backButton}
                  title="Regresar"
                  onPress={this.props.onBack}
                />
              </View>
            </View>
          </ImageBackground>
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
        <ImageBackground source={background} style={styles.container}>
          <Swiper
              goBackToPreviousCardOnSwipeRight = {true}
              showSecondCard={false}
              cards={cards}
              // disable right swipe when is first card
              disableRightSwipe = {this.state.isFirst}
              // enable top swipe when is last card
              disableTopSwipe = {!this.state.isLast}
              // never swipe bottom
              disableBottomSwipe = {true}
              // disable swipe left when is last card
              disableLeftSwipe = {
                this.state.isLast && !this.state.submitPending
              }
              renderCard={(material) => {
                  if(material.nombre == "last"){
                    return(
                      <View style={styles.card}>
                          <Text style={styles.text}>Desliza hacia arriba para enviar la checklist</Text>
                      </View>
                    )
                  }
                  if(this.state.isFirst == true){
                    return(
                      <View style={styles.card}>

                          <Text style={styles.text} allowFontScaling={false}>{material.nombre}</Text>
                          <Text style={styles.objetivo}>{"Objetivo:  "+material.objetivo}</Text>
                          <TextBox
                            style={styles.TextBox}
                            objetivo = {material.objetivo}
                            default={material.cantidad+''}
                            labelText={material.medida}
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
                        <View style={styles.tutorialContainer}>
                          <View style={styles.leftSwipeContainer}>
                            <Text
                            style={styles.arrowleft}
                            allowFontScaling={false}
                            minimumFontScale={10}
                            maxFontSizeMultiplier={50}> ↪ </Text>
                            <Text style={styles.leftSwipe}  allowFontScaling={false} maxFontSizeMultiplier={15}> Desliza hacia la derecha para ir al material anterior</Text>
                          </View>
                          <View style={styles.boxTutorialContainer}>
                            <Text style={styles.boxTutorial} allowFontScaling={false} maxFontSizeMultiplier={15}> Escribe la cantidad actual del material</Text>
                          </View>
                          <View style={styles.rightSwipeContainer}>
                          <Text style={styles.arrowright}  allowFontScaling={false} maxFontSizeMultiplier={50}> ↩ </Text>
                            <Text style={styles.rightSwipe} allowFontScaling={false} maxFontSizeMultiplier={15}> Desliza hacia la izquierda para ir al siguiente material</Text>
                          </View>
                        </View>
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
                            labelText={material.medida}
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
              onSwipedTop={
                (cardIndex) => {
                  // sometimes onswipedup fails and doesnt do onswipedall
                  // and deck swipes right without running onswipedright
                  console.log('swipetop')
                  console.log(cardIndex)
                  let copy = this.state
                  copy.submitPending = true
                  this.setState(copy)
                }
              }
              onSwipedBottom={(cardIndex)=>console.log('swipedown at idx '+cardIndex)}
              onSwipedLeft={
                (cardIndex) => {
                  console.log('swipeleft')
                  let copy = this.state
                  copy.isLast = false
                  copy.isFirst = false
                  copy.submitPending = false
                  console.log(cardIndex)
                  if(cardIndex == observationsIndex)
                    copy.isLast = true
                  this.setState(copy)
                }
              }
              onSwipedRight={
                (cardIndex) => {
                  console.log('swiperight')
                  console.log(cardIndex)
                  let copy = this.state
                  copy.isFirst = false
                  copy.isLast = false
                  copy.submitPending = false
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
              backgroundColor={'transparent'}
              stackSize= {3}>
          </Swiper>
      </ImageBackground>

    );


    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusMessage: {
    flex: 1,
    justifyContent: "center"
  },
  statusText: {
    textAlign: "center",
    fontSize: 55,
    backgroundColor: "transparent",
    color: "white"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#fee0c8",
    justifyContent: "center",
    backgroundColor: '#fee0c8'
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  tutorialContainer: {
  flexDirection: 'row',
  alignSelf: 'center',

  },
  rightSwipeContainer: {
    height: 50,
    width: 100,

  },
  rightSwipe: {
    textAlign:'center',
    fontSize: 13

  },
  leftSwipeContainer: {
    height: 50,
    width: 100,

  },
  leftSwipe: {
    textAlign:'center',
    fontSize: 13
  },
  boxTutorialContainer: {
    height: 50,
    width: 70,
  },
  boxTutorial: {
    textAlign:'center',
    fontSize: 13,
    alignSelf: 'center'
  },
  arrowleft: {
    fontSize:50,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  arrowright: {
    fontSize:50,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  arrowcenter: {
    fontSize:50,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  TextBox:{
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
    color: "white"
  },
  scrollView: {
    backgroundColor: '#e39d5b',
    margin: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b36217',
  },
  backButtonContainer:{
    alignItems: 'center',
    color: '#ffffff',
    marginBottom:20
  },
  backButton:{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15

  },
  buttonText:{
    color: 'black',
    textAlign: 'center',
    fontSize:20

  }
});
