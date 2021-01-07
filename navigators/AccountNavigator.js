import React, { useState, useEffect } from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import SignUpCompScreen from "../screens/SignupCompScreen";
import CompanyDetailsScreen from "../screens/Company/CompanyDetailsScreen";
import UserDetailsScreen from "../screens/Company/CompanyDetailsScreen";
import AsyncStorage from '@react-native-community/async-storage';

import baseURL  from '../assets/common/baseUrl';


const Stack = createStackNavigator()


function MyStack() {


    return (
        <Stack.Navigator>


           
              <Stack.Screen 
                    name='companyDetails'
                    component={CompanyDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                
              <Stack.Screen 
                    name='userDetails'
                    component={UserDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
        </Stack.Navigator>
    )
}

export default function AccountNavigator() {
    return <MyStack  />;
}