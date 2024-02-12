import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStackScreens } from "./AuthStacks"
import { useSelector } from 'react-redux'
import { DrawerStacks } from './DrawerStacks'

const AppStack = createNativeStackNavigator()
export const AppStacks = () => {
  const selector = useSelector(state => state.loginReducer);
  const demoLogin = selector.demoLoggedin

  return (
    <AppStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      {
        (selector.isLoggedin || demoLogin) ?
          <AppStack.Screen name="DrawerStack" component={DrawerStacks} />
          :
          <AppStack.Screen name="AuthStack" component={AuthStackScreens} />
      }
    </AppStack.Navigator>
  )
}