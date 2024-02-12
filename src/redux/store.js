import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginReducer from './reducers/loginReducer'
import homeReducer from './reducers/homeReducer';
import allBrandReducer from './reducers/allBrandReducer';
import orderListReducer from './reducers/orderListReducer';
import storeReducer from './reducers/storeReducer';
import purchaseHistoryReducer from './reducers/purchaseHistoryReducer';
import addressReducer from './reducers/addressReducer';
import cartReducer from './reducers/cartReducer';
import commonReducer from './reducers/commonReducer';
import productListReducer from './reducers/productListReducer';
import wishListReducer from './reducers/wishListReducer';
import storeByCityReducer from './reducers/storeByCityReducer';
import applyForCreditReducer from './reducers/applyForCreditReducer';
import appTrackingReducer from './reducers/appTrackingReducer';
import notificationReducer from './reducers/notificationReducer';

const persistConfig = {
    key: 'karnika-retailer-app-persist-key',
    storage: AsyncStorage,
    blacklist: ['navigation']
}

const appReducer = combineReducers({
    loginReducer,
    homeReducer,
    allBrandReducer,
    orderListReducer,
    storeReducer,
    purchaseHistoryReducer,
    addressReducer,
    cartReducer,
    commonReducer,
    productListReducer,
    wishListReducer,
    storeByCityReducer,
    applyForCreditReducer,
    appTrackingReducer,
    notificationReducer
})

const rootReducer = (state, action) => {

    // if (action.type === 'USER_LOGOUT') {
    //     // storage.removeItem("karnika-retailer-persist-key")
    //     // return appReducer(undefined, action)
    // }

    return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: false,
            serializableCheck: false
        }),
})

const persistor = persistStore(store)

module.exports = {
    store,
    persistor
}