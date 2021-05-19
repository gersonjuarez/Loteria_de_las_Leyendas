import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import SignInScreen from './Signup';
import SignUpScreen from './Login';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>


        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>


    </RootStack.Navigator>
);

export default RootStackScreen;