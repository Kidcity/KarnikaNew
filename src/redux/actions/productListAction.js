import { CLEAR_PRODUCT_LIST_DATA, SET_LAST_PRODUCT_FILTER, SET_LAST_PRODUCT_STATE, SET_PRODUCT_LIST, SET_PRODUCT_LIST_LAST_OFFSET, SET_PRODUCT_LIST_VIEW_TYPE } from "../types"


export const setProductListAction = data => {
    return{
        type: SET_PRODUCT_LIST,
        payload: data
    }
}

export const setProductListViewType = data => {
    return{
        type: SET_PRODUCT_LIST_VIEW_TYPE,
        payload: data
    }
}

export const setLastScreenOffset = data => {
    return{
        type: SET_PRODUCT_LIST_LAST_OFFSET,
        payload: data
    }
}

export const setProductLastFilterAction = data => {    
    return{
        type: SET_LAST_PRODUCT_FILTER,
        payload: data
    }
}

export const clearProductListData = data => {
    return{
        type: CLEAR_PRODUCT_LIST_DATA
    }
}