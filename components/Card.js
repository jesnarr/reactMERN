import React from 'react';
import { Text, View, StyleSheet, Image  } from 'react-native';

const Card = () =>  {

        return (
            <>
            <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image 
                        // source={require('../assets/programmer.jpg')}
                        // srouce={{uri: 'link here'}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Dummy title</Text>
                </View>
                <View style={styles.descriptionWrapper}>
                        <Text style={styles.description}>Dummy Description</Text>
                
                </View>
            </View>
               <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image 
                        // source={require('../assets/programmer.jpg')}
                        // srouce={{uri: 'link here'}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Dummy title</Text>
                </View>
                <View style={styles.descriptionWrapper}>
                        <Text style={styles.description}>Dummy Description</Text>
                
                </View>
            </View>
               <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image 
                        // source={require('../assets/programmer.jpg')}
                        // srouce={{uri: 'link here'}}
                        style={styles.image}
                    />
                </View>
                <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Dummy title</Text>
                </View>
                <View style={styles.descriptionWrapper}>
                        <Text style={styles.description}>Dummy Description</Text>
                
                </View>
            </View>
            </>
        )
    
}

export default Card;

const styles = StyleSheet.create(
    {   
        card:{
            backgroundColor: '#ffffff',
            height:300,
            margin: 20,
            borderRadius:10,
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: {width:0, height:2},
            shadowRadius: 8,
            elevation: 5,
        },
         imageWrapper:{
             width: '100%',
             height: '60%',
             borderTopLeftRadius:10,
             borderTopRightRadius:10,
             overflow: 'hidden',
         },
         image:{
            
            height:'100%',
            width:'100%',
            // resizeMode: "contain",
            justifyContent: "center"

         },
         titleWrapper:{
             height:'10%',
             paddingHorizontal: 15,
         },
         title:{
             fontSize: 20,
             marginTop:10,
             fontWeight:'bold'
         },
         descriptionWrapper:{
             height: '30%',
             paddingHorizontal: 15,
         },
         description:{
              marginTop:10
         }
         
    }
);