import { SET_WISHLIST_COUNT, CLEAR_WISHLIST_COUNT } from "../types"

export const setWishListCount = data => {
    return{
        type: SET_WISHLIST_COUNT,
        payload: data
    }
}

export const clearWishListCount = data => {
    return{
        type: CLEAR_WISHLIST_COUNT
    }
}