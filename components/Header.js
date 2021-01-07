import React from 'react';
import { Text, View, StyleSheet,  } from 'react-native';

const Header = props =>  {

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>
        )
    
}

export default Header;

const styles = StyleSheet.create(
    {
        header:{
            backgroundColor: '#f2f2f2',
            padding:15
        },
        headerTitle:{
            marginTop: 40,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold'
        }

    }
);