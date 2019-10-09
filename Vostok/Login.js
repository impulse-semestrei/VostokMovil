import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform  } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';

const { width: WIDTH } = Dimensions.get('window');

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
      this.setState({ userInfo: userInfo, loggedIn: true });
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
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
        />
      <View style={styles.buttonContainer}>
        {!this.state.loggedIn && <Text>You are currently logged out</Text>}
        {this.state.loggedIn && <Button onPress={this.signOut}
        title="Signout"
        color="#841584">
        </Button>}
        </View>

        {!this.state.loggedIn}
            {this.state.loggedIn && <View>
              <View style={styles.listHeader}>
                <Text>User Info</Text>
              </View>
              <View style={styles.dp}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
                />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>ID</Text>
                <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text>
              </View>
            </View>}

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    justifyContent: 'center',
  },
  backgroundContainer:{
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imagecontainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: 10,
  },
  logo: {
    width: 250,
    height: 80,
    resizeMode: 'stretch'
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  boton: {
    width: 240,
    height: 50,
    resizeMode: 'stretch'
  },
  btnLogin :{
    width: WIDTH - 220,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'rgba(220,20,60,50)',
    marginHorizontal: 109,
    marginTop: 30
  },
  text :{
    color: 'rgba(255,255,255,10)',
    fontSize: 16,
    textAlign: 'center',
    marginTop:10
},
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
},
  detailContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
});
