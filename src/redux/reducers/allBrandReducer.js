import { SET_ALL_BRAND, CLEAR_ALL_BRAND, SET_COMING_SOON_BRAND, SET_FILTERED_BRAND } from "../types"
const initialState = {
    brands: [],
    filtered_brand: [],
    coming_soon_brand: []
}

function allBrandReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_BRAND:
            return { ...state, brands: action.payload }
        case SET_COMING_SOON_BRAND:
            return { ...state, coming_soon_brand: action.payload }
        case SET_FILTERED_BRAND:
            return { ...state, filtered_brand: action.payload }
        case CLEAR_ALL_BRAND:
            return initialState

        default:
            return state
    }
}

export default allBrandReducer