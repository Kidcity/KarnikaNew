import { SET_GENDER, CLEAR_STORE_BY_CITY_DATA, SET_AVAILABLE_BRANDS_BY_CITY, SET_CATEGORIES, SET_BANNERS_STORE_BY_CITY, SET_MINIMUN_ORDER_PRICE } from "../types";

const initialState = {
    banners: {},
    gender: [],
    available_brands: [],
    categories: [],
    vertical_categories:[],
    categories_for_filter: [],
    minimum_order_price: 0
}

function storeByCityReducer(state = initialState, action) {
    switch (action.type) {

        case SET_BANNERS_STORE_BY_CITY:
            return { ...state, banners: action.payload }
        case SET_GENDER:
            return { ...state, gender: action.payload }
        case SET_AVAILABLE_BRANDS_BY_CITY:
            return { ...state, available_brands: action.payload }
        case SET_CATEGORIES:
            return { ...state, categories: action.payload.categories, categories_for_filter: action.payload.categories_for_filter, vertical_categories: action.payload.vertical_categories }
        case SET_MINIMUN_ORDER_PRICE:
            return { ...state, minimum_order_price: action.payload }
        case CLEAR_STORE_BY_CITY_DATA:
            return initialState
        default:
            return state
    }
}

export default storeByCityReducer