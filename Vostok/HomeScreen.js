import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform  } from 'react-native';



export default class HomeScreen extends React.Component {


render(){

  return (

    <View>
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
