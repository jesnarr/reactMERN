import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


const ApplicationScreen = () => {



    return(
        <ScrollView >
        <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={{
                
                        fontSize:20,

                    }}>
                        {/* {jobDetail.name} */}
                    </Text>
                    <Text style={{
                    
                        color:"#B2B2B2",
                    }}> 
                        {/* {jobDetail.description}
                        */}
                       
                    </Text>
   
                </View>
                
    </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    card:{
        marginTop:50,
        padding:20
    }
});
export default ApplicationScreen;