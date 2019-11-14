import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Button, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from './styles/DashStyles.js';
//FONDO DE LOGIN--
import background from './imagenes/home_background.jpg';

//logo
import logo from './imagenes/logo.png';
import ambulance from './imagenes/ambulance.png'

export default class Login extends React.Component {








render(){
  return (



    <ImageBackground source={background} style={styles.container}>

    <Text style={styles.title}>   Ambulancias   </Text>
    <ScrollView style={styles.scrollView}>
    <View style={styles.buttonContainer}>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    <Text style={styles.text}> 1 </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    <Text style={styles.text}> 3 </Text>
    </View>
    </TouchableOpacity>


    <TouchableOpacity style={styles.ambulanceContainer} >

    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    <Text style={styles.text}> 5</Text>
    </View>
    </TouchableOpacity>


    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    <Text style={styles.text}> 2 </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 4 </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 6 </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 6 </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 6 </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 6 </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.ambulanceContainer} >
    <View style={styles.dir}>
    <Image style={styles.ambulance}
        source={ambulance}
        resizeMode="contain"
    />
    </View>
    <Text style={styles.text}> 6 </Text>
    </TouchableOpacity>







    </View>


    </ScrollView>
    </ImageBackground>

  );
}
}
