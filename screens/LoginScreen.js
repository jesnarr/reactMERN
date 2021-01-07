import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from "react-native-toast-message";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

import baseURL  from '../assets/common/baseUrl';

const LoginScreen = (props) =>{


   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
  


   const sendCred = async (props) =>
  {
    if(email == '' || password == '')
    {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "LOGIN FAILED",
        text2: 'Email or Password is empty',
      });

    }else{
      fetch(`${baseURL}users/login`,{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            "email":email,
            "password":password
          })
      })
      .then(res=>res.json())
      .then(async (data) =>{
          try{
            if(data.message)
            {
              Toast.show({
                topOffset: 100,
                type: "error",
                text1: "LOGIN FAILED",
                text2: data.message,
              });
            }else{
              Toast.show({
                topOffset: 100,
                type: "success",
                text1: "LOGIN SUCCESS",
                text2: data.message,
              });
             
       
              await AsyncStorage.setItem('id',data.id);
            
                props.navigation.navigate("home")
            }
          }catch(e)
          {
            console.log(e);
          }
      })
    }
  }

  useEffect(() => {

    return () => {
        setEmail('');
        setPassword('');
    };
  }, [])

  return (
    <>
    <KeyboardAvoidingView behavior="position">
      {/* <View style={styles.container}> */}
          <Text style={{fontSize:35,marginLeft:18,marginTop:50}}>Welcome to </Text>
          <Text style={{margin:10,marginLeft:18}}>
          Job Listing App </Text>
          <View style={styles.underline}>
          </View>
          <Animatable.Text style={{fontSize:20,marginLeft:18,marginTop:20}} animation="slideInUp" >
           Login with your account
          </Animatable.Text>

          <Animatable.View  animation="slideInUp">
           <TextInput 
            label='Email'
            mode="outlined"
            value={email}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setEmail(text)}
          />
         
       
            <TextInput 
            label='Password'
            mode="outlined"
            secureTextEntry={true}
            value={password}
            secureText
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setPassword(text)}
          />

          <Button  mode="contained" onPress={() => sendCred(props)}
            style={{marginTop:18,marginLeft:18,marginRight:18}}
            theme={{colors: {primary:"blue"}}}
          >
          SIGN IN
         </Button>
        </Animatable.View>
        <TouchableOpacity >
        <Animatable.View animation="slideInUp">
        <Text
            onPress={() => props.navigation.navigate("signup")}
            style={{fontSize:14,marginLeft:18,marginTop:20}}>
            don't have an account? 
          </Text>
          </Animatable.View>
          </TouchableOpacity>
          </KeyboardAvoidingView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline:
  {
    borderBottomWidth: 4,
    borderBottomColor: 'black',
    borderRadius: 10,
    marginLeft:20,
    marginRight:100,
  }
});

export default LoginScreen;

//

1.  file structure
2.  database structure
3.  environment