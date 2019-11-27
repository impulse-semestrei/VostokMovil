import Checklist from './Checklist.js'
import React from 'react';

export default class EstadoAmbulancia extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Checklist
        url={'http://10.0.2.2:8000/ambulancia/'+this.props.navigation.getParam('id_ambulancia')+'/json/'}
        nombre_paramedico={this.props.navigation.getParam('nombre_paramedico')}
        email_paramedico={this.props.navigation.getParam('email_paramedico')}
        onBack={() => this.props.navigation.navigate('Ambulancia', {
          nombre_paramedico: this.props.navigation.getParam('nombre_paramedico'),
          email_paramedico: this.props.navigation.getParam('email_paramedico'),
        })}
      />
    )
  }

}
