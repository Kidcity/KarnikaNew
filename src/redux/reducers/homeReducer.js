import { Animated } from "react-native"
import { SET_AVAILABLE_BRAND_HOMEPAGE, CLEAR_HOME_DATA, SET_COLORS, SET_MAIN_CATEGORIES, STORE_CITIES_HOMEPAGE, SET_BANNERS_HOMEPAGE, SET_ICONIC_BRAND_HOMEPAGE, SET_PROMOS, SET_SHOPINSHOP_BRAND_HOMEPAGE } from "../types"

const initialState = {
    banners: {},
    available_brand: [],
    main_categories: [],
    colors: [],
    cities: [],
    iconic_brand: [],
    shop_in_shop: [],
    promos: []
}


function homeReducer(state = initialState, action) {
    switch (action.type) {

        case SET_BANNERS_HOMEPAGE:
            return { ...state, banners: action.payload }

        case SET_PROMOS:
            return { ...state, promos: action.payload }

        case SET_AVAILABLE_BRAND_HOMEPAGE:
            return { ...state, available_brand: [...action.payload] }

        case SET_MAIN_CATEGORIES:
            return { ...state, main_categories: [...action.payload] }

        case SET_SHOPINSHOP_BRAND_HOMEPAGE:
            return { ...state, shop_in_shop: action.payload }
            
        // case SET_COLORS:
        //     return { ...state, colors: [...action.payload] }

        case STORE_CITIES_HOMEPAGE:
            return { ...state, cities: [...action.payload] }

        case SET_ICONIC_BRAND_HOMEPAGE:
            return { ...state, iconic_brand: action.payload }

        case CLEAR_HOME_DATA:
            return initialState
        default:
            return state
    }
}

export default homeReducer