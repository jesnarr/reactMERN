import React, {useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
// import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = (props) => {

// const detectLogin= async ()=>{
//     const token = await AsyncStorage.getItem('token')
//         if(token){
//               props.navigation.replace("home")
//         }else{
//             props.navigation.replace("login")
//         }
//   }
//   useEffect(()=>{
//    detectLogin()
//   },[])
  return (
    <>
        <View style={styles.container} >
        <ActivityIndicator 
            size="large"
            color="blue"
        />
        </View>
    </>
  );
}

export default LoadingScreen; 
const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

