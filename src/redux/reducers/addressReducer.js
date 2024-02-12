import { SET_DEFAULT_ADDRESS, SET_SHIPPING_ADDRESS } from "../types"

const initialState = {
    default_address: null,
    shipping_addresses: [],
}

function addressReducer(state = initialState, action){
    switch (action.type) {

        case SET_SHIPPING_ADDRESS:          
            return { ...state, shipping_addresses: action.payload}

        case SET_DEFAULT_ADDRESS:
            return {...state, default_address: action.payload}

        default:
            return state
    }
}

export default addressReducer