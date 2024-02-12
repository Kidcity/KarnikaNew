import { CLEAR_STORE_DATA, STORE_BRANDS, STORE_SUB_CATEGORIES } from "../types";


export const storeSubCategoriesAction = data => dispatch => {
    dispatch({
        type: STORE_SUB_CATEGORIES,
        payload: data
    })
}

export const setStoreBrandDataAction = data => dispatch => {
    dispatch({
        type: STORE_BRANDS,
        payload: data
    })
}

export const clearStoreDataAction = data => dispatch => {
    dispatch({
        type: CLEAR_STORE_DATA
    })
}