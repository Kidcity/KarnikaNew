import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LoginScreen,
    ResetPasswordScreen,
    OTPVerificationScreen,
    ChangePasswordScreen,
    RegisterScreen,
    TestScreen
} from '../screens/index'


const AuthStack = createNativeStackNavigator()
function AuthStackScreens() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            {/* <AuthStack.Screen name='TestScreen' component={TestScreen} /> */}
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
            <AuthStack.Screen name='OTPVerificationScreen' component={OTPVerificationScreen} />
            <AuthStack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} />
            <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}

export {
    AuthStackScreens
}