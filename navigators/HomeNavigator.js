import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import HomeContainer from "../screens/HomeScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='home'
                component={HomeContainer}
                options={{
                    headerShown: false,
                }}
            />
            
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}