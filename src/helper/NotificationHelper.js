import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
// import { _recordCrashReport, _setCrashAttributes } from './CrashlyticsHelper';
import { _setBackgroundNotificationListner, _setForeGroundNotificationListener } from './NotificationListener';
import { store } from '../redux/store'
import { setToStore } from './AsyncStorageHelper';
import { setUnreadNotificationsCount } from '../redux/actions/notificationAction';
import messaging from '@react-native-firebase/messaging'

export const _checkPermission = async () => {
    
    const enabled = await messaging().hasPermission();
    console.log('enabled ******* ', enabled)
    if (enabled) {
        getDeviceToken();
    } else {
        requestUserNotificationPermission();
    }
};

// Register the device with FCM
const getDeviceToken = async () => {
    
    let token = ''
    await messaging().registerDeviceForRemoteMessages();
    await messaging().getToken().then(response => {
        token = response
    }).catch(error => {
        // console.log('errro =>> ', error);
    })
    console.log("DeviceToken>>>>>>>>>>>" + token);
    await setToStore('@device_token_KARNIKA', token)
}

function notificationAlert() {
    Alert.alert("Permission needed!", "karnika wants to send notification.\nPlease give permission from app settings.", [
        {
            text: "Go To Settings", onPress: () => {
                Linking.openSettings()
            }
        }
    ])
}

const requestUserNotificationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
                .then((result) => {
                    // console.log(result);
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            // console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            // console.log('The permission has not been requested / is denied but requestable');
                            notificationAlert()
                            break;
                        case RESULTS.LIMITED:
                            // console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            // console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            // console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                    // console.log("permission error => ", error);
                });

        } else if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                //console.log('Authorization status:', authStatus);
            } else {
                Alert.alert("Oops !!!", "You have denied notification permission.",
                    [
                        { text: "Cancel", onPress: () => console.log("OK Pressed") },
                        {
                            text: "Give Permission",
                            onPress: () => requestUserPermission()
                        }
                    ]
                )
            }
        }
    } catch (error) {
        // _recordCrashReport(error)
    }
}

const _configureLocalNotification = () => {
    PushNotification.configure({
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: async (notification) => {
            // console.log("onNotification   ====> ", notification);
            const url = notification?.data?.link
            if (url) {
                Linking.openURL(url)
            }
        },
        //(optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        invokeApp: false,
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
    })
}


function onNotificationReceivedForeground(message) {
    const channelId = createChannel();
    PushNotification.cancelAllLocalNotifications();
    // console.log(message);

    if (!message.notification) {
        return
    }

    const image_url = Platform.OS === 'android' ? message.notification.android.imageUrl : ''
    const largeIconUrl = message.data.largeIconUrl ? message.data.largeIconUrl : ''
    const bigLargeIconUrl = message.data.bigLargeIconUrl ? message.data.bigLargeIconUrl : ''


    const configObject = {
        channelId: channelId,
        message: message.notification.body,
        title: message.notification.title,
        userInfo: message.data,
        picture: image_url,
        largeIconUrl: largeIconUrl,
        bigLargeIconUrl: bigLargeIconUrl,
    }
    PushNotification.localNotification(configObject);

    const total_unread_notification = store.getState().notificationReducer.total_unread_notification
    store.dispatch(setUnreadNotificationsCount((+total_unread_notification + 1)))
}

const createChannel = () => {
    const channelId = "karnikaNotificationChannelID123"

    PushNotification.createChannel({
        channelId: channelId,
        channelName: "karnika-notification-channel"
    })
    return channelId
}

export const _handleAppOpenFromBackgroundState = () => {

    try {
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                // console.log("_handleAppOpenFromBackgroundState helper ====> ", remoteMessage);
                const link = remoteMessage?.data?.link
                if (link) {
                    Linking.openURL(link)
                }
            }
        })
    } catch (error) {
        // _setCrashAttributes({
        //     function: "_handleAppOpenFromBackgroundState()",
        //     error: JSON.stringify(error),
        //     firebaseFunction: "onNotificationOpenedApp()"
        // })
        // _recordCrashReport(error)
        reject(false)
    }
}

export const _handleAppOpenFromQuitState = () => {

    try {
        messaging().getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    // console.log("_handleAppOpenFromQuitState helper ====> ", remoteMessage);
                    const link = remoteMessage?.data?.link
                    if (link) {
                        Linking.openURL(link)
                    }
                }
            }).catch(error => {
                // _setCrashAttributes({
                //     function: "_handleAppOpenFromQuitState()",
                //     error: JSON.stringify(error),
                //     firebaseFunction: "getInitialNotification()"
                // })
                // _recordCrashReport(error)
            })
    } catch (error) {
        // _setCrashAttributes({
        //     function: "_handleAppOpenFromQuitState()",
        //     error: JSON.stringify(error),
        //     firebaseFunction: "getInitialNotification()"
        // })
        // _recordCrashReport(error)
        reject(false)
    }
}



/*:::::::::::::::::::::::::::: CALLING FUNCTIONS  ::::::::::::::::::::::::::::::*/

_checkPermission();
_configureLocalNotification()
_setBackgroundNotificationListner()
_setForeGroundNotificationListener(onNotificationReceivedForeground)


