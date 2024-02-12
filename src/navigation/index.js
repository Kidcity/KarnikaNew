import React, { useRef } from 'react'
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { navigationRef } from '../helper/NavigationHelper';
// import analytics, { firebase } from '@react-native-firebase/analytics';
import { deepLinking } from '../helper/DeepLinking';
import { AppStacks } from './AppStacks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clearScreenActivity } from '../helper/AppActivityTrackingHelper';

export default function Navigator(props) {
  const routeNameRef = useRef();
  const apptrackSelector = useSelector(state => state.appTrackingReducer)
  const loginselector = useSelector(state => state.loginReducer)
  const user_id = loginselector.data.cust_manu_id ?? ""

  useEffect(() => {

  }, [])

  return (
    <NavigationContainer
      linking={deepLinking}
      ref={navigationRef}
      onReady={(e) => {        
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;        
        props.getCurrentRouteName(routeNameRef.current)
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        
        props.getCurrentRouteName(currentRouteName)
        
        props.onRouteChange()
        

        if (previousRouteName !== currentRouteName) {      
          // console.log("route change ===> ", previousRouteName, currentRouteName );    
          // await firebase.analytics().setUserId(user_id);
          // await analytics().logScreenView({
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // });
        }else{
          // console.log("route not change ===> ", previousRouteName, currentRouteName );    
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <AppStacks></AppStacks>
    </NavigationContainer>
  )
}