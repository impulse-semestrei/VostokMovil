import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, FlatList, ScrollView, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import TextBox from './TextBox.js'
import background from './imagenes/home_background.jpg';
export default class EditableTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {items: this.props.items}
    }

    render(){
        let items = this.state.items.map(item => {
            return(
              <View key={item.id} style={styles.row}>
                <Text style={styles.itemData}>{item.nombre}</Text>
                <TextInput 
                    style={styles.itemData} 
                    defaultValue={item.cantidad + ""}
                    onChangeText={
                        text => {
                            if(text != ""){
                                let copy = this.state
                                for(let tempItem of copy.items){
                                    // if item from state is the rendered item
                                    if(tempItem.id == item.id){
                                        tempItem.cantidad = parseInt(text)
                                        this.setState(copy)
                                        break
                                    }
                                }
                            }
                            this.props.onChange(this.state.items)
                        }
                    }
                />
                <Text style={styles.itemData}>{item.objetivo}</Text>
              </View>
            )
        })
        return(
            <View style={{flex:3, flexDirection:"column"}}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.row}>
                        <Text style={styles.header}>Nombre</Text>
                        <Text style={styles.header}>Actual</Text>
                        <Text style={styles.header}>Objetivo</Text>
                    </View>
                    {items}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemData: {
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10,
        flex:1,
        alignSelf: 'stretch',
    },
    header: {
        flex:1,
        alignSelf: 'stretch',
    },
    row: {
        flex:1,
        flexDirection: 'row',
        borderColor: '#b36217',
        borderTopWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    tableTitle: {
        textAlign: "center",
        fontSize: 40,
        color: "white"
    },
    scrollView: {
        backgroundColor: '#e39d5b',
        margin: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#b36217',
    },
});