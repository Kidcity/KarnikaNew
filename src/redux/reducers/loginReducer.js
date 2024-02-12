import { CITY_WALLET_AMOUNT, CLEAR_LOGIN_DATA, DEMO_LOGIN, SETAPP_VERSION, SET_LOGIN_FLAG, STORE_LOGIN_DATA } from "../types"
const initialState = {
    data: {},
    isLoggedin: false,
    demoLoggedin: false,
    city_wallet_amt: 0,
    version_code: '',
    version_name: ''
}


function loginReducer(state = initialState, action) {

    switch (action.type) {

        case SETAPP_VERSION:
            return { ...state, version_code: action.payload.version_code, version_name: action.payload.version_name }
        case DEMO_LOGIN:
            return { ...state, demoLoggedin: action.payload }
        case STORE_LOGIN_DATA:
            return { ...state, data: action.payload }
        case SET_LOGIN_FLAG:
            return { ...state, isLoggedin: action.payload }
        case CITY_WALLET_AMOUNT:
            return { ...state, city_wallet_amt: action.payload }
        case CLEAR_LOGIN_DATA:
            return initialState
        default:
            return state
    }
}

export default loginReducer