import { SET_CART_ITEMS, SET_CART_COUNT_DATA, CLEAR_CART_DATA, SET_CART_TOTAL_PRICE_DETAILS } from "../types"

const initialState = {
    cart_items: [],
    total_price_details: [],
    total_cart_items: 0
}

function cartReducer(state = initialState, action) {

    switch (action.type) {
        case SET_CART_ITEMS:
            return { ...state, cart_items: action.payload }

        case SET_CART_TOTAL_PRICE_DETAILS: 
            return { ...state, total_price_details: action.payload}
        
        case SET_CART_COUNT_DATA:
            return { ...state, total_cart_items: parseInt(action.payload) }

        case CLEAR_CART_DATA:
            return initialState
        default:
            return state
    }
}

export default cartReducer