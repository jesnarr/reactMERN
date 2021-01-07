import React, {useState, useEffect} from 'react';
import {  Text , StyleSheet, ScrollView, View, Image, TouchableOpacity, RefreshControl} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage';

import Card from '../components/Card';
import Header from '../components/Header';
import baseURL  from '../assets/common/baseUrl';



import * as Animatable from 'react-native-animatable';



const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function HomeScreen(props) {

const [jobs, setJobs] = useState([]);
const [popularJob, setPopularJob] = useState([]);
const [item, setItems] = useState([])
const [userType, setUserType] = useState(false);
const [search, setSearch] = useState('');


const isFocused = useIsFocused(); 


// search job
const searchJob = (key) => {
    props.navigation.navigate('JobList',{ name: key})
}

const getJobs = async () =>
  {
        
      fetch(`${baseURL}jobs`)
      .then(res=>res.json())
      .then(async (data) =>{
        try{

            setJobs(data);
            const user = await AsyncStorage.getItem("id");
    
            if(user)
            {
             setUserType(user);
            }
          
          }catch(e)
        {
          console.log(e);
        }
          
      })
    
  }
  const popJob = async () =>
  {
    
      fetch(`${baseURL}jobs/popular`)
      .then(res=>res.json())
      .then(async (data) =>{
        try{
          setPopularJob(data);
         
          }catch(e)
        {
          console.log(e);
        }
          
      })
    
  }
  useEffect(() => {
    popJob();
    getJobs();
    // onRefresh();
    return () => {
    setJobs([]);
    setPopularJob([]);
    setUserType();
      setSearch('');
    // setJobDetails([]);
    }
  }, [isFocused])



// // search job
// const searchJob = (key) => {
//     props.navigation.navigate('JobList',{ name: key})
//     // console.log(key);
// }

  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //    getJobs();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  return (
    <>
  
       <ScrollView
        // contentContainerStyle={styles.scrollView}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
         

      <Header title="JOB APPLICATION"/>
      <View>
      {/* <View >
                   <TextInput 
                    label='Search Job'
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
            </View> */}
          <Animatable.Text animation="slideInUp" style={styles.headerTitle}>Find the best job for you!</Animatable.Text>
                <Animatable.View  animation="slideInUp">
                <TextInput 
               
                label='Search Job'
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

         <Text style={styles.headerTitle}>MOST POPULAR</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        { popularJob.map(job => 
                          <TouchableOpacity onPress={() => 
                          props.navigation.navigate('jobDetails',{ id: job._id})} key={job._id}>
                        <View key={job._id} style={styles.jobTitleContainer}>
                             
                              <Image source={require('../assets/images/data-transfer.png')} 
                                  style={{ width:"100%",height:100,marginTop:15}}
                                  resizeMode="contain"
                              />
                              <Text style={styles.jobTitle}>{job.name.toUpperCase()}</Text>
                             <Text style={styles.textSalary}>Salary:  <Text style={{fontSize:9}}> {job.salary}</Text></Text>
                         </View>
                         </TouchableOpacity>
                      )}
                    </ScrollView>
      </View>
{/* 
       <View>
         <Text style={styles.headerTitle}>RECOMMENDED JOBS</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    { popularJob.map(job => 
                      <TouchableOpacity onPress={() => 
                          props.navigation.navigate('jobDetails',{ id: job._id})} key={job._id}>
                          <View key={job._id} style={styles.jobTitleContainer}>
                              
                                <Image source={require('../assets/images/data-transfer.png')} 
                                    style={{ width:"100%",height:100,marginTop:15}}
                                    resizeMode="contain"
                                />
                                <Text style={styles.jobTitle}>{job.name.toUpperCase()}</Text>
                              <Text style={styles.textSalary}>Salary:  <Text style={{fontSize:9}}> {job.minSalary} - {job.maxSalary}</Text></Text>
                          </View>
                        </TouchableOpacity>
                          )}
                       
                    </ScrollView>
      </View> */}
        {/* all jobs */}
          <View>
           <Text style={styles.allJob}>ALL JOBS</Text>

               { jobs.map(job => 
                 <TouchableOpacity onPress={() => 
                   props.navigation.navigate('jobDetails',{ id: job._id})} key={job._id}>
                <View  style={styles.jobContainer}>

                            <View style={styles.imageContainer}> 
                                      <Image source={require('../assets/images/enterprise.png')} style={{width:40,height:40}}/> 
                              </View> 

                                  <View style={{ paddingHorizontal:20}}>
                                
                                      <Text style={styles.jobText}>{job.name.toUpperCase()}</Text>
                                        <Text style={styles.location}>Location</Text>
                                      <View style={styles.locationText}>
                                        
                                      </View>
                                  <View >
                                      <Text style={styles.textSalary}>Salary:  <Text> {job.salary} </Text></Text>
                                      
                                  </View>
                        
                                  </View>

                                  
                  </View>
                  </TouchableOpacity>
               )}
          </View>
          {/* end all jobs */}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    container:{
       padding:30
    },
    textSalary:{
      fontWeight:"bold",
      fontSize:12,
    },
    salary:{
      fontSize:9,
    
    },
    headerTitle:{
      fontWeight:'bold',
      marginTop:10,
      marginLeft:25,
      fontSize:15
    },
    jobContainer:{
       backgroundColor:"#FFF",
      // marginTop:10,
      flexDirection:"row",
      borderRadius:10,
      height:90,
      alignItems:"center",
      paddingHorizontal:20,
      margin:10,
    },
    imageContainer:{
       backgroundColor:"#DFDFDF",
      borderRadius:5,
      height:40,
      width:40,
      alignItems:"center",
      justifyContent:"center"
    },
    allJob:{
      fontWeight:'bold',
      marginTop:10,
      marginLeft:25,
      fontSize:15
    },
    locationText:{
       backgroundColor:"#DFDFDF",
      borderRadius:5,
      width:70,
      alignItems:"center",
      marginVertical:5
    },
    jobText:{
      fontWeight:"bold",
      fontSize:13
    },
   jobTitle:{
     color:"#000",
    fontWeight:"bold",
    fontSize:13,
    margin:10,
    justifyContent: "center"
   },
   jobTitleContainer:{
     
    backgroundColor:"#FFF",
    height:200,
    width:150,
    borderRadius:20,
    marginTop:15,
    margin:20,
    alignItems:'center'
                        
   },
   location:{                               
      fontSize:13
   }
});



