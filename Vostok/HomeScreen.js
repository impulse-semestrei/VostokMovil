import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform,  } from 'react-native';



export default class HomeScreen extends React.Component {

  constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }

    componentDidMount(){
      return fetch('http://10.0.2.2:8000/api/api/1')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }


render(){
  if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
        <Text>LOADING</Text>
      </View>
    )
  }


return (
  <View>
      <Text>{this.state.dataSource.username}</Text>
      <Text>{this.state.dataSource.email}</Text>
      <Text>{this.state.dataSource.is_staff}</Text>
      <View>
        <Text>User Info</Text>
      </View>
      <View>
        <Text>Name</Text>
        <Text>{this.props.navigation.state.params.NameOBJ}</Text>
      </View>
      <View>
        <Text>Email</Text>
        <Text>{this.props.navigation.state.params.EmailOBJ}</Text>
      </View>
      <View>
        <Text>ID</Text>
        <Text>{this.props.navigation.state.params.IdOBJ}</Text>
      </View>
  </View>







  );
}
}
