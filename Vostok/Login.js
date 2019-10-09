import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform  } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import styles from './styles/LoginStyles.js';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';


export default class Login extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        pushData: [],
        loggedIn: false
      }
    }

    componentDidMount() {
        GoogleSignin.configure({
          webClientId: '359237875627-8lasvg6rcn590k3bh77jtqehufnhpcj4.apps.googleusercontent.com',
          offlineAccess: true,
          hostedDomain: '',
          forceConsentPrompt: true,
        });
      }

      _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true});
      this.props.navigation.navigate('HomeScreen', {
      NameOBJ: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name,
      EmailOBJ: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email,
      IdOBJ: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id,
    });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };



  render(){
    return (

      <ImageBackground source={background} style={styles.container}>

      <View style={styles.Imagecontainer}>
        <Image source={logo} style={styles.logo}>
        </Image>
      </View>

      <GoogleSigninButton
        style={{ width: 192, height: 48, marginHorizontal:85, }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
        />


      </ImageBackground>
    );
  }
}
//HERRAMIENTAS:
// Boton signIn
/**
<View style={styles.buttonContainer}>
  {!this.state.loggedIn && <Text>You are currently logged out</Text>}
  {this.state.loggedIn && <Button onPress={this.Send_Data}
  title="Signout"
 color="#841584">
 </Button>}
   </View>
   **/
