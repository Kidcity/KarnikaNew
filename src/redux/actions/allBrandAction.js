import { CLEAR_ALL_BRAND, SET_ALL_BRAND, SET_COMING_SOON_BRAND, SET_FILTERED_BRAND } from "../types"

export const setFilteredBrandAction = data => dispatch => {
    dispatch({
        type: SET_FILTERED_BRAND,
        payload: data
    })
}

export const setAllBrandAction = data => dispatch => {
    dispatch({
        type: SET_ALL_BRAND,
        payload: data
    })
}

export const setComingSoonAction = data => dispatch => {
    dispatch({
        type: SET_COMING_SOON_BRAND,
        payload: data
    })
}

export const clearAllBrandData = data => dispatch => {
    dispatch({
        type: CLEAR_ALL_BRAND
    })
}