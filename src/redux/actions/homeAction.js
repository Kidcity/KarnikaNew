import { SET_AVAILABLE_BRAND_HOMEPAGE, CLEAR_HOME_DATA, SET_COLORS, SET_MAIN_CATEGORIES, STORE_CITIES_HOMEPAGE, SET_BANNERS_HOMEPAGE, SET_ICONIC_BRAND_HOMEPAGE, SET_PROMOS, SET_SHOPINSHOP_BRAND_HOMEPAGE } from "../types";


export const setBannersAction = data => dispatch => {   
    dispatch({
        type: SET_BANNERS_HOMEPAGE,
        payload: data
    })
}

export const availableBrandsAction = data => dispatch => {   
    dispatch({
        type: SET_AVAILABLE_BRAND_HOMEPAGE,
        payload: data
    })
}

export const mainCategoriesAction = data => dispatch => {   
    dispatch({
        type: SET_MAIN_CATEGORIES,
        payload: data
    })
}

export const setPromosAction = data => dispatch => {   
    dispatch({
        type: SET_PROMOS,
        payload: data
    })
}

export const storeCitiesAction = data => dispatch => {
    dispatch({
        type: STORE_CITIES_HOMEPAGE,
        payload: data
    })
}

export const setIconicBrandAction = data => dispatch => {   
    dispatch({
        type: SET_ICONIC_BRAND_HOMEPAGE,
        payload: data
    })
}

export const setShopINshopBrandAction = data => dispatch => {   
    dispatch({
        type: SET_SHOPINSHOP_BRAND_HOMEPAGE,
        payload: data
    })
}

export const clearHomeData = data => dispatch => {
    dispatch({
        type: CLEAR_HOME_DATA
    })
}