import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SignupCompScreen from "../screens/SignupCompScreen";
import CompanyDetailsScreen from "../screens/Company/CompanyDetailsScreen";
import CompanyUpdateScreen from "../screens/Company/CompanyUpdateScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import JobListScreen from "../screens/JobListScreen";

import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import AccountNavigator from "./AccountNavigator";
import ApplicationNavigator from "./ApplicationNavigator";

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Main () {


  return (
      <Stack.Navigator>
          
          <Stack.Screen
                name='home'
                component={HomeScreen}
                options={{
                headerShown: false,
                }}
           />
            <Stack.Screen
                name='companyDetails'
                component={CompanyDetailsScreen}
                options={{
                headerShown: false,
                }}
           /> 
            <Stack.Screen
                name='updateCompany'
                component={CompanyUpdateScreen}
                options={{
                headerShown: false,
                }}
           />
            <Stack.Screen
                name='jobDetails'
                component={JobDetailsScreen}
                options={{
                headerShown: false,
                }}
           />
            <Stack.Screen
                name='JobList'
                component={JobListScreen}
                options={{
                headerShown: false,
                }}
           />
           
      </Stack.Navigator>

   
   
  );
};


function AuthNavigator()
{
  return (
      <Tab.Navigator 
                  initialRouteName="Home"
                  tabBarOptions={{
                    keyboardHidesTabBar: true,
                    showLabel: false,
                    activeTintColor: "#e91e63",
                  }}
                >
                      <Tab.Screen
                    name="Home"
                    component={Main}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Search"
                    component={SearchNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="search" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                  
                <Tab.Screen
                    name="application"
                    component={ApplicationNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="heart" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                  
                    <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="user-circle" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                   </Tab.Navigator>

  )
    
}
function AppsNavigator()
{
 const [isLoggedIn,setLogged] = useState(0);

    const detectLogin = async () => {
            const userType = await AsyncStorage.getItem('id');
            
            if(userType)
            {
              setLogged(1); 
            }else{
              setLogged(0); 
            }

        };
    useEffect(() => {
        detectLogin();
        return() => {
          setLogged();
        }
    }, [])
AsyncStorage.removeItem('id');


  return(
      
        <NavigationContainer>
            {
               isLoggedIn  ?
              
                   <Tab.Navigator 
                  initialRouteName="Home"
                  tabBarOptions={{
                    keyboardHidesTabBar: true,
                    showLabel: false,
                    activeTintColor: "#e91e63",
                  }}
                >
                      <Tab.Screen
                    name="Home"
                    component={Main}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                      ),
                    }}
                  />

                  <Tab.Screen
                    name="Search"
                    component={SearchNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="search" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                  
                <Tab.Screen
                    name="application"
                    component={ApplicationNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="heart" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                  
                    <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <View>
                          <Icon name="user-circle" color={color} size={30} />
                        
                        </View>
                      ),
                    }}
                  />
                   </Tab.Navigator>

              : 
                (
      
               <Stack.Navigator>
              <Stack.Screen
                       name='login'
                    component={LoginScreen}
                    options={{
                     headerShown: false,
                     }}
                  />
                   <Stack.Screen
                      name='signup'
                      component={SignupScreen}
                      options={{
                      headerShown: false,
                      }}
                 />
                   <Stack.Screen
                      name='company'
                      component={SignupCompScreen}
                     options={{
                    headerShown: false,
                       }}
                  />
                 <Stack.Screen
                       name='home'
                      component={AuthNavigator}
                       options={{
                      headerShown: false,
                       }}
                 /> 
             </Stack.Navigator>
        

                )
             
              
            }

        </NavigationContainer>
       
  )
}

export default AppsNavigator;
