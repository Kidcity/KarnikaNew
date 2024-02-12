import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableHighlight, TouchableOpacity, Platform, Linking, LogBox, AppState, BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Navigator from './src/navigation';
import colors from './src/utils/colors';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Toast from 'react-native-toast-message'
import HomeService from './src/services/HomeService';
import VersionInfo from 'react-native-version-info'
import AppUpdateModal from './src/component/AppUpdateModal';
import { errorAlert, retryAlert } from './src/helper/ToastHelper';
// import analytics, { firebase } from '@react-native-firebase/analytics';
// import crashlytics from '@react-native-firebase/crashlytics';
// import { _crashApp, _recordCrashReport, _setCrashAttributes } from './src/helper/CrashlyticsHelper';
// import { _checkPermission, _handleAppOpenFromBackgroundState, _handleAppOpenFromQuitState } from './src/helper/NotificationHelper';
import { appStoreLink } from './src/utils/variable';
import AppTrackingService from './src/services/AppTrackingService';
import { clearCache } from './src/helper/cacheHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import { _checkPermission, _handleAppOpenFromBackgroundState, _handleAppOpenFromQuitState } from './src/helper/NotificationHelper';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppupdateModal: false,
      appState: AppState.currentState,
      currentRouteName: "",
    };
    this._second = 0
    this._interval = null

  }

  static getDerivedStateFromProps(props, state) {
    return {

    }
  }

  _getAppVersion() {
    
    HomeService._getAppVersion().then(response => {

      if (response.data.data.data) {
        const data = response.data.data.data

        if (Platform.OS === "android") {
          const current_app_versionName = VersionInfo.appVersion.toString()
          const current_app_versionCode = VersionInfo.buildVersion.toString()

          const updated_app_versionName = data.retailer_android_v.toString()
          const updated_app_versionCode = data.retailer_android_version_code.toString()

          if (current_app_versionCode !== updated_app_versionCode) {
            // if versioncode is not same
            this.setState({
              showAppupdateModal: true
            })
          } else {
            // if versioncode is same but versionname is not same
            if (current_app_versionName !== updated_app_versionName) {
              this.setState({
                showAppupdateModal: true
              })
            }
          }


        } else if (Platform.OS === "ios") {

          const current_app_versionName = VersionInfo.appVersion.toString()
          const current_app_versionCode = VersionInfo.buildVersion.toString()

          const updated_app_versionName = data.retailer_ios_v.toString()
          const updated_app_versionCode = data.retailer_ios_version_code.toString()

          if (current_app_versionCode !== updated_app_versionCode) {
            // if versioncode is not same
            this.setState({
              showAppupdateModal: true
            })
          } else {
            // if versioncode is same but versionname is not same
            if (current_app_versionName !== updated_app_versionName) {
              this.setState({
                showAppupdateModal: true
              })
            }
          }

        }
      }

    }, error => {
      //console.log('error', error);
      if (error.message == "server_error") {
        retryAlert(() => this._getAppVersion())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  _getAppLogo(){
    HomeService._getAppLogo().then(response => {
      
    }, error => {
      
      if (error.message == "server_error") {
        retryAlert(() => this._getAppLogo())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }


  _updateApp() {
    if (Platform.OS === 'android') {
      Linking.openURL(appStoreLink.androidstore)
    } else {
      const link = appStoreLink.iosstore
      Linking.canOpenURL(link).then(supported => {
        supported && Linking.openURL(link);
      }, (err) => {
        _setCrashAttributes({
          error: "Linking failed for IOS.",
          func: "_updateApp",
        })
        _recordCrashReport(err)
        // console.log(err) 
      }
      );
    }
  }

  _getFirebaseId = async () => {
    try {
      const appInstanceId = await analytics().getAppInstanceId();
      firebase.analytics().setAnalyticsCollectionEnabled(true);
      //console.log(appInstanceId);
    } catch (error) {
      _setCrashAttributes({
        error: "initializing firebase analytics",
        func: "_getFirebaseId",
      })
      _recordCrashReport(error)
    }

  }

  async componentDidMount() {
    SplashScreen.hide();
    this._getAppLogo();
    // const is_cleared = await AsyncStorage.getItem("@cache_cleared")
    // console.log('is_cleared', is_cleared);
    // if (is_cleared !== "1") {
    //   await clearCache()
    // }

    


    this.startTimer()
    // this._getAppVersion();
    // this._getFirebaseId();
    _handleAppOpenFromBackgroundState()
    _handleAppOpenFromQuitState()

    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          _checkPermission()
        }
        this.setState({ appState: nextAppState });
      },
    );
    // await crashlytics().setCrashlyticsCollectionEnabled(true).then(() => console.log("setCrashlyticsCollectionEnabled ", true));


  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    this._interval = setInterval(() => {
      this._second += 1
      // console.log('second ===> ', this.state.currentRouteName, this._second);
    }, 1000);
  }

  pauseTimer = () => {
    clearInterval(this._interval)
    this._interval = null
  }

  stopTimer = () => {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
      this._second = 0
    }
  }

  onRouteChange = async () => {

    const lastDuration = this._second
    this.stopTimer()
    this.startTimer()
    
    await AppTrackingService._saveTrackingDataService(lastDuration, this.state.currentRouteName).then(response => {

    }, error => {

    }).catch(err => {
      console.log(err);
    })

  }

  render() {
    // console.log('openAvailCreditModal ==> ', this.state.openAvailCreditModal);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            {
              this.state.showAppupdateModal ?
                <AppUpdateModal
                  onPressUpdate={() => this._updateApp()}
                />
                :
                <Navigator
                  getCurrentRouteName={(currentRouteName) => this.setState({ currentRouteName: currentRouteName })}
                  onRouteChange={this.onRouteChange}
                />
            }

            <Toast
              // ref={ref => Toast.setRe}
              config={{
                // success: props => null
              }}
              position='top'
              bottomOffset={20}
              onPress={() => {
                Toast.hide()
              }}
            />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}


//
//react-native-store-version

/*

bridal - ghagra, saree set, ensamble 
kurti - regular, fancy
salwar suit - regular, fancy, bridal
bottom - legging, pyjama, fancy 

*/