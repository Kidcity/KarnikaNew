import { SET_AVAILABLE_BRANDS_BY_CITY, CLEAR_STORE_BY_CITY_DATA, SET_GENDER, SET_CATEGORIES, SET_BANNERS_STORE_BY_CITY } from "../types";


export const setBannersAction = data => dispatch => {
    dispatch({
        type: SET_BANNERS_STORE_BY_CITY,
        payload: data
    })
}

export const setGenderAction = data => dispatch => {
    dispatch({
        type: SET_GENDER,
        payload: data
    })
}

export const setAvailableBrandsByCityAction = data => dispatch => {
    dispatch({
        type: SET_AVAILABLE_BRANDS_BY_CITY,
        payload: data
    })
}

export const setCategoriesAction = data => dispatch => {
    dispatch({
        type: SET_CATEGORIES,
        payload: data
    })
}


export const clearStoreDataAction = data => dispatch => {
    dispatch({
        type: CLEAR_STORE_BY_CITY_DATA
    })
}