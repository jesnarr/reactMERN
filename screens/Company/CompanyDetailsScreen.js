import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,Alert, ScrollView } from 'react-native';
import { Button, TextInput, Provider, Chip } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Toast from "react-native-toast-message";


import baseURL  from '../../assets/common/baseUrl';

import AsyncStorage from '@react-native-community/async-storage';

const CompanyDetailsScreen = (props) => {


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [type, setType] = useState('');
    const [requirements, setRequirements] = useState('');
    // const [company, setCompany] = useState('');
    //  const [showDropDown, setShowDropDown] = useState('');
    //  const [userType, setUserType] = useState('');

    

    const sendCred = async (props) =>
    {

        if(name == '' || salary == '' || type == '' || requirements == '' || description == '')
        {
        Toast.show({
            topOffset: 100,
            type: "error",
            text1: "REGISTER FAILED",
            text2: 'Please provide details',
          });
        }else{
        const company = await AsyncStorage.getItem("id");
                if(company) {
                    
                    fetch(`${baseURL}jobs`,{
                    method: "POST",
                    headers:{
                    'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        name: name,
                        description:description,
                        salary: salary,
                        user: company,
                        type:type,
                        requirements: requirements,
                    })
                })
                .then(res=>res.json())
                .then(async (data) =>{
                    try{
                    // await AsyncStorage.setItem('token',data.token);
                    Toast.show({
                        topOffset: 100,
                        type: "success",
                        text1: "JOB POSTED",
                        text2: data.name,
                    });
                    setName('');
                    setDescription('');
                    setSalary('');
                    setType('');
                    setRequirements('');
                    props.navigation.navigate("home");
                    }catch(e)
                    {
                    console.log(e);
                    }
                })
            }else{
                Toast.show({
                        topOffset: 100,
                        type: "error",
                        text1: "No user detected",
                        text2: data.message,
                    });
            }
}
        
}

    // useEffect(() => {
    //     return () => {
    //     setName('');
    //     setDescription('');
    //     setSalary('');
    //     setType('');
    //     setRequirements('');
    //     // setCompany();
    //     };
    // }, [])

 const logout =()=>{
      AsyncStorage.removeItem("id").then(()=>{
        props.navigation.replace("login")
      })
   }


    return(
        <ScrollView >
        <KeyboardAvoidingView >
      
          
            <View style={{flexDirection: 'row',  justifyContent: 'flex-end',marginTop:50,marginRight:10 }}>
               <Chip 
                onPress={logout}
                mode="outlined"
                style={{backgroundColor:'white'}}
                type="outlined">Sign out</Chip>
          </View>
          <Text style={{fontSize:35,marginLeft:18}}>Hi </Text>
          <Text style={{margin:10,marginLeft:18}}>
          Job Listing App </Text>
          <View style={styles.underline}>
          </View>
           
          <Animatable.View animation="slideInUp">
          <Text style={{fontSize:20,marginLeft:18,marginTop:20}}>Post a job</Text>
           <TextInput 
            label='Job Title'
            mode="outlined"
            value={name}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setName(text)}
          />
          <TextInput 
            label='Salary'
            mode="outlined"
            value={salary}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setSalary(text)}
          />
            <TextInput 
            label='Type'
            mode="outlined"
            value={type}
            style={{marginLeft:18,marginRight:18,marginTop:18}}
            theme={{colors: {primary:"blue"}}}
            onChangeText={(text) => setType(text)}
          />
            <TextInput 
                label='Description'
                mode="outlined"
                value={description}
                style={{marginLeft:18,marginRight:18,marginTop:18}}
                theme={{colors: {primary:"blue"}}}
                 multiline={true}
                onChangeText={(text) => setDescription(text)}
            />
             <TextInput 
                label='Requirements'
                mode="outlined"
                value={requirements}
                style={{marginLeft:18,marginRight:18,marginTop:18}}
                theme={{colors: {primary:"blue"}}}
                multiline={true}
                onChangeText={(text) => setRequirements(text)}
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
         POST
        </Button>
        
        </Animatable.View>
        
          </KeyboardAvoidingView>
           </ScrollView>
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

});

export default CompanyDetailsScreen;