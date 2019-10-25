import React from 'react';
import { TextInput } from 'react-native';

export default class TextBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }

  componentDidMount(){
    this.setState({text: this.props.default})
  }

  render(){
    return(
          <TextInput
            keyboardType='numeric'
            onChangeText={
              text => {
                this.setState({text: text})
                this.props.onChange(text)
              }
            }
            value={this.state.text}
          />
    )
  }

}
