import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native';
import { Button, TextInput, Provider, Chip } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Toast from "react-native-toast-message";

import baseURL  from '../assets/common/baseUrl';

// import DropDown from 'react-native-paper-dropdown';
// import DropDownPicker from 'react-native-dropdown-picker';
// import AsyncStorage from '@react-native-community/async-storage';

 const SignupScreen = (props) => {

   const [fullName, setFullName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');
  //  const [showDropDown, setShowDropDown] = useState('');
  //  const [userType, setUserType] = useState('');
  
 

   const sendCred = async (props) =>
  {

    if(fullName == '' || email == '' || password == '' || phone == '')
    {
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "REGISTER FAILED",
            text2: 'Please provide details',
          });
    }
    else{

     fetch(`${baseURL}users/register`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "name": fullName,
          "email":email,
          "password":password,
          "phone": phone
        })
     })
     .then(res=>res.json())
     .then(async (data) =>{
        try{
          // await AsyncStorage.setItem('token',data.token);
          Toast.show({
            topOffset: 100,
            type: "success",
            text1: "REGISTER SUCCESS",
            text2: data.name,
          });
         props.navigation.navigate("login");
        }catch(e)
        {
          console.log(e);
        }
     })
    }
  }

  useEffect(() => {
    return () => {
      setFullName('');
      setEmail('');
      setPassword('');
      setPhone('');
    };
  }, [])

  return (
    <>
    {/* <Provider> */}
    <KeyboardAvoidingView behavior="position">
      {/* <View style={styles.container}> */}
          <Text style={{fontSize:35,marginLeft:18,marginTop:50}}>Welcome to </Text>
          <Text style={{margin:10,marginLeft:18}}>
          Job Listing App </Text>
          <View style={styles.underline}>
          </View>
          <Animatable.View animation="slideInUp">
          <Text style={{fontSize:20,marginLeft:18,marginTop:20}}> Create new account</Text>
          <View style={{flexDirection: 'row',  justifyContent: 'center',marginTop:10 }}>
            <Chip icon="account"
            type="flat">User</Chip>
            <Chip icon="group"
            onPress={() => props.navigation.navigate("company")}
            mode="outlined"
            style={{backgroundColor:'white'}}
            type="outlined">Organization</Chip>
          </View>
           <TextInput 
            label='Full name'
            mode="outlined"
            value={fullName}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setFullName(text)}
          />
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

           <TextInput 
            label='Contact Number'
            mode="outlined"
            value={phone}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setPhone(text)}
          />

          {/* <DropDownPicker
              style={{marginLeft:18,marginRight:18,marginTop:18}}
              items={[
                  {label: 'USA', value: 'usa'},
                  {label: 'UK', value: 'uk' },
                  {label: 'France', value: 'france'},
              ]}
       
  
          /> */}

        {/* <SafeAreaView style={styles.containerStyle}>
          <DropDown
              label={'User Type'}
              mode={'outlined'}
              labelTextStyle={styles.dropdownLabel}
              itemTextStyle={styles.dropdownItem}
              theme={{colors: {primary:"blue"}}}
              value={userType}
              setValue={setUserType}
              list={genderList}
              disabledItemColor={'#000'}
              visible={showDropDown}
              itemColor={'#000'}
              style={styles.dropdownMainText}                         
              style = {{color: '#000'}}
              baseColor={'#000'}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
              }}
          />
        </SafeAreaView> */}



          <Button  mode="contained" 
            onPress={() => sendCred(props)}
            style={{marginTop:18,marginLeft:18,marginRight:18}}
            theme={{colors: {primary:"blue"}}}
          >
          SIGN UP
        </Button>
        </Animatable.View>
        <TouchableOpacity >
        <Animatable.View animation="slideInUp">
        <Text
            onPress={() => props.navigation.navigate("login")}
            style={{fontSize:14,marginLeft:18,marginTop:20}}>
            already have an account? 
          </Text>
          </Animatable.View>
          </TouchableOpacity>
          </KeyboardAvoidingView>
          {/* </Provider> */}
  </>
  );
}

const styles = StyleSheet.create({
   containerStyle: {
    marginHorizontal: 20,
    justifyContent: 'center',
    marginLeft:18,
    marginRight:18,
    marginTop:18,
   
  },
  dropdownLabel:{
      textTransform: 'uppercase',
      color: '#000'
  }, 
  dropdownItem:{
      color: '#000'
  },
  dropdownMainText:{
    color: '#000'
  },  
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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

export default SignupScreen;
