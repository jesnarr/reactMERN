import React, { useState, useEffect } from 'react';
import {Text,ScrollView, StyleSheet, View} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";

import baseURL  from '../assets/common/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

const SearchScreen = (props) => {



const [type , setType] = useState('');
const [search, setSearch] = useState('');

const getType = () => {
    console.log('search');
}


// search job
const searchJob = (key) => {
    props.navigation.navigate('JobList',{ name: key, isAdmin: type})
}



useEffect(() => {
    // getUserType();
  return () => {
    setSearch('');
    setType();

  };
}, [])


    return( 
        
        <View style={styles.container}>
            
              
                <Animatable.Text animation="slideInUp" style={styles.headerTitle}>Find it here!!</Animatable.Text>
                    <Animatable.View  animation="slideInUp">
                    <TextInput 
                
                    label='Search '
                    mode="outlined"
                    value={search}
                    style={{width:'100%',padding:10}}
                    theme={{colors: {primary:"blue"}}}
                    onChangeText={(text) => setSearch(text)}
                    right={
                    <TextInput.Icon 
                    name={() => <Icon name={'search'} size={20} 
                    onPress={() => searchJob(search)}
                    />} 

                    />}
                />

                </Animatable.View>            
            </View>
    
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },  
    headerTitle:{
        fontWeight:'bold',
        marginTop:30,
        marginLeft:25,
        fontSize:15
      },
 

});


export default SearchScreen;