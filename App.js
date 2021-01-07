import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppNavigator from './navigators/Main';


import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import JobListScreen from './screens/JobListScreen';
// import AsyncStorage from '@react-native-community/async-storage';

import Main from './navigators/Main';
import Toast from "react-native-toast-message";

const Stack  = createStackNavigator();


const App = () => {

const [isLoggedIn,setLogged] = useState(null);

// const detectLogin = async () => {
//         const token = await AsyncStorage.getItem('token');
//         if(token)
//         {
//           setLogged(true);

//         }else{
//           setLogged(false);
//         }

//     };
// useEffect(() => {
//   detectLogin();
// }, [])

  return (
    <>
    
      <AppNavigator />
      <Toast ref={(ref) => Toast.setRef(ref)} />
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

export default App;
