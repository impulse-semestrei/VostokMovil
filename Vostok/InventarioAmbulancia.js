import Checklist from './Checklist.js'
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

export default class InventarioAmbulancia extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Checklist
        url={'http://10.0.2.2:8000/inventario/'+this.props.navigation.getParam('id_inventario')+'/json/'}
        nombre_paramedico={this.props.navigation.getParam('nombre_paramedico')}
        email_paramedico={this.props.navigation.getParam('email_paramedico')}
        onBack={() => this.props.navigation.dispatch(
          StackActions.reset(
            {
              index: 1,
              actions: [
                NavigationActions.navigate({routeName: 'First'}),
                NavigationActions.navigate({
                  routeName: 'Ambulancia', 
                  params: {
                    NameOBJ: this.props.navigation.getParam('nombre_paramedico'),
                    EmailOBJ: this.props.navigation.getParam('email_paramedico'),
                  }
                })
              ]
            }
          )
        )}
      />
    )
  }

}
