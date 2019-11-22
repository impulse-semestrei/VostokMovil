import Checklist from './Checklist.js'
import React from 'react';

export default class EstadoAmbulancia extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Checklist
        url={'https://rescate1app.com/ambulancia/'+this.props.navigation.getParam('id_ambulancia')+'/json/'}
        nombre_paramedico={this.props.navigation.getParam('nombre_paramedico')}
        email_paramedico={this.props.navigation.getParam('email_paramedico')}
      />
    )
  }

}
