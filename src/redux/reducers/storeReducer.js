import { CLEAR_STORE_DATA, STORE_SUB_CATEGORIES, STORE_BRANDS } from "../types";

const initialState = {
    sub_category: [],
    brands: []
}

function storeReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_SUB_CATEGORIES:
            return { ...state, sub_category: action.payload }
        case STORE_BRANDS:
            return { ...state, brands: action.payload }
        case CLEAR_STORE_DATA:
            return initialState
        default:
            return state
    }
}

export default storeReducer