import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Application from "../screens/ApplicationScreen";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='application'
                component={Application}
                options={{
                    headerShown: false,
                }}
            />
             
            
        </Stack.Navigator>
    )
}

export default function ApplicationNavigator() {
    return <MyStack />;
}