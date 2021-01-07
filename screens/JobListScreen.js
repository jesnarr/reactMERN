import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import baseURL  from '../assets/common/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';

const JobListScreen = (props) => {

    
    const { name } = props.route.params;
    const [jobList, setJobList] = useState([]);
    const [userType, setUserType] = useState(false);
    const [users, setUsers] = useState([]);


       const getUserType = async () => {
        const id = await AsyncStorage.getItem('id');
        if(id)
        {
            fetch(`${baseURL}users/${id}`)
            .then(res=>res.json())
            .then((data) =>{
                try{
                    //   setUserType(data.isAdmin);
                    if(data.isAdmin)
                    {
                       
                        // setUserType(data.isAdmin);
                        // fetch(`${baseURL}jobhistory/search/${name}`)
                        // .then(res=>res.json())
                        // .then(async (data) =>{

                        //   console.log(data);
                        //     try{
                        //         setUsers(data);
                        //     }catch(e)
                        //     {
                        //         console.log(e);
                        //     }
                          
                        // })
                         fetch(`${baseURL}jobs/search/${name}`)
                        .then(res=>res.json())
                        .then(async (data) =>{

                          console.log(data);
                            try{
                                setJobList(data);
                            }catch(e)
                            {
                                console.log(e);
                            }
                          
                        })
                       
                    }else{
                        
                        // setUserType(data.isAdmin);
                        fetch(`${baseURL}jobs/search/${name}`)
                        .then(res=>res.json())
                        .then(async (data) =>{

                          console.log(data);
                            try{
                                setJobList(data);
                            }catch(e)
                            {
                                console.log(e);
                            }
                          
                        })
                    }
                }catch(e)
                {
                console.log(e);
                }
               
            })

        }
}
  // console.log(isAdmin);
    // const getAllJob = async () => {
    //       console.log(userType);
    //         fetch(`${baseURL}jobs/search/${name}`)
    //         .then(res=>res.json())
    //         .then(async (data) =>{

    //           console.log(data);
    //             try{
    //                 setJobList(data);
    //             }catch(e)
    //             {
    //                  console.log(e);
    //             }
               
    //         })
    //     }
        useEffect(() => {
             getUserType();
              // getAllJob();
            return () => {
               setUserType();
               setJobList([]);
               setUsers([]);
               
            }
        }, [])



    return(
        <ScrollView>
        {/* all jobs */}
          <View>
           <Text style={styles.allJob}>ALL JOBS</Text>

               { jobList.map(job => 
                 <TouchableOpacity onPress={() => 
                   props.navigation.navigate('jobDetails',{ id: job._id})} key={job._id}>
                <View  style={styles.jobContainer}>

                            <View style={styles.imageContainer}> 
                                    <Image source={require('../assets/images/data-transfer.png')} style={{width:40,height:40}}/> 
                              </View> 

                                  <View style={{ paddingHorizontal:20}}>
                                
                                      <Text style={styles.jobText}>{job.name.toUpperCase()}</Text>
                                        <Text style={styles.location}>Location</Text>
                                      <View style={styles.locationText}>
                                        
                                      </View>

                                      
                                  <View >
                                      <Text style={styles.textSalary}>Salary:  <Text> {job.salary}</Text></Text>
                                      
                                  </View>
                        
                                  </View>

                                  
                  </View>
                  </TouchableOpacity>
               )}
          </View>
          {/* end all jobs */}
    </ScrollView>
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
      margin:20,
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
    margin:20
                        
   },
   location:{                               
      fontSize:13
   }


});



export default JobListScreen;