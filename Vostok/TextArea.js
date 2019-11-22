import React from 'react';
import { TextInput,StyleSheet, View, Text } from 'react-native';

export default class TextBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }

  componentDidMount(){
    this.setState({text: this.props.default})
  }

  render(){
    if (parseInt(this.state.text)< this.props.objetivo){
      return(
        <View style={styles.container}>
            <TextInput
              style={styles.textInputWrong}
              multiline
              placeholder={'Escribe aqui'}
              maxLength={250}
              numberOfLines={3}
              keyboardType='numeric'
              onChangeText={
                text => {
                  this.setState({text: text})
                  this.props.onChange(text)
                }
              }
              value={this.state.text}
            />
          </View>
      )

    }else{


    return(
      <View style={styles.container}>
        <Text style={styles.label}>Cantidad: </Text>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={
              text => {
                this.setState({text: text})
                this.props.onChange(text)
              }
            }
            value={this.state.text}
          />
        </View>

    )
        }

  }

}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 140
  },
  textInput: {
    width : 60,
    height : 60,
    fontSize: 40,
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
});
