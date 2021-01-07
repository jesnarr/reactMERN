import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';

import Toast from "react-native-toast-message";

import baseURL  from '../assets/common/baseUrl';

const JobDetailsScreen = (props) => {

        const { id } = props.route.params; 
        const [jobDetail, setJobDetail] = useState([]);
       
        const getDetails = async () => {
            fetch(`${baseURL}jobs/${id}`)
            .then(res=>res.json())
            .then(async (data) =>{
                try{
                      setJobDetail(data);
                }catch(e)
                {
                console.log(e);
                }
               
            })
        }
         const deleteData = async () => {
            fetch(`${baseURL}jobs/delete/${id}`)
            .then(res=>res.json())
            .then(async (data) =>{
                try{
                      Toast.show({
                        topOffset: 100,
                        type: "success",
                        text1: "Job Deleted",
                        // text2: 'Please provide details',
                    });
                }catch(e)
                {
                console.log(e);
                }
               
            })
        }
         const updateData = async () => {
                props.navigation.navigate('updateCompany',{ id: id})
                // console.log('update');
            
        }
        
        

        useEffect(() => {
            getDetails();
            return () => {
                setJobDetail([]);
            }
        }, [])


        return(
                <ScrollView style={styles.container}> 
                <ImageBackground 
                source={require('../assets/images/data-transfer.png') } 
                  style={{ width:"100%",height:250}}
                resizeMode="center"
                  >
                      <View style={{
                          backgroundColor:"#000",
                          height:30,
                          width:40,
                          marginLeft:-50,
                          marginTop:70,
                          borderRadius:8,
                          alignItems:"center",
                          justifyContent:"center"
                      }}>
                          {/* <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                               <Image source={require('../assets/icon.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity> */}
                    
                      </View>
                </ImageBackground>  
                 <View style={{
                        backgroundColor:"#FFF",
                        padding:10,
                        borderRadius:15
                        }}>
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center", }}>
                                <View>
                                        <Text style={{
                                            fontSize:18,
                                            }}>{jobDetail.name}
                                        </Text>
                                         <Text style={{
                                                
                                                fontSize:13,
                                                color:"#B8B8B8",
                                                fontWeight: 'bold'
                                            }}>Salary: {jobDetail.salary}</Text>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                          <Text style={{
                            
                                                color:"#000",
                                                opacity:0.6,
                                                fontSize:14
                                            }}>Location</Text>

                                           
                                        </View>
                                </View>
                        </View>
                </View>
                  <View style={{
                        backgroundColor:"#FFF",
                        borderRadius:15,
                        padding:20,
                        marginTop:20
                    }}>
                        <Text style={{
                      
                            fontSize:20,
                            marginBottom:10
                        }}>Job Description</Text>
                        <Text style={{
                           
                            color:"#B2B2B2",
                        }}> 
                            {jobDetail.description}
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor:"#FFF",
                        borderRadius:15,
                        padding:20,
                        marginTop:20
                    }}>
                        <Text style={{
                      
                            fontSize:20,
                            marginBottom:10
                        }}>Job Requirements</Text>
                        <Text style={{
                           
                            color:"#B2B2B2",
                        }}> 
                           {jobDetail.requirements}
                        </Text>
                    </View>
                     <Button  mode="contained" 
                            onPress={() => deleteData()}
                            style={{marginTop:18,marginLeft:18,marginRight:18}}
                            theme={{colors: {primary:"blue"}}}
                        >
                            Delete
                        </Button>
                <Button  mode="contained" 
                onPress={() => updateData()}
                style={{marginTop:18,marginLeft:18,marginRight:18}}
                theme={{colors: {primary:"blue"}}}
            >
                Update
            </Button>
                </ScrollView>
        );
}


const styles = StyleSheet.create({

    container:{
    backgroundColor:"#f8f8f8",
    height:"100%",
    paddingHorizontal:20
    }

});

export default JobDetailsScreen;