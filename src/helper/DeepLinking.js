import { Linking } from "react-native";
// import { _recordCrashReport, _setCrashAttributes } from "./CrashlyticsHelper";
import {store} from '../redux/store'

const loginState = () => {
  const selector = store.getState().loginReducer
  if (!selector.isLoggedin) {
    return "AuthStack"
  } else {
    return "DrawerStack"
  }
}

// const setProductListParam = () => {
//   const selector = store.getState().commonReducer

// }


export const deepLinking = {
  prefixes: ['app://karnika/'],
  config: {
    screens: {
      initialRouteName: loginState(),
      AuthStack: { 
        screens: {
          Login: "login",
          RegisterScreen: "register",
        },
      },
      DrawerStack: {
        path: "drawer",
        screens: {
          OrderDetails: {
            path: "order/:order_id",
            parse: {
              order_id: (order_id) => order_id
            }
          },
          MyOrders:"myorder",
          AllBrands: "allbrands",
          Cart:"cart",
          Home: {
            path: "home/:rate_experience",
            parse:{
              rate_experience: rate_experience => rate_experience
            }
          },
          ProductListing:{
            path:"productlist/:city/:brand/:category?/:subCategory?",
            parse:{
              city: city => city,
              brand: (brand) => brand,
            }
          },
          WishList:"wishlist",
          ProductDetails:{
            path:"product/:product_id",
            parse:{
              product_id: (product_id) => product_id
            }
          },
          PromoCode: "promo"
        }
      },
      // NotFound: '*',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL()

    console.log('url ===> ', url);
    if (url != null) {
      return url;
    }
  },
  subscribe(listener) {

    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listeners      
      // Linking.removeEventListener('url', onReceiveURL);
      linkingSubscription.remove();
    };
  }
}