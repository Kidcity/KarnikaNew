import React from 'react';
import messaging from '@react-native-firebase/messaging'

export const _setBackgroundNotificationListner = () => {
  messaging().setBackgroundMessageHandler(async message => {
    // console.log('onMessageReceived background (setBackgroundMessageHandler) =====> ', message);
  });
}


export const _setForeGroundNotificationListener = (onMessageReceived) => {
  messaging().onMessage(onMessageReceived);
}