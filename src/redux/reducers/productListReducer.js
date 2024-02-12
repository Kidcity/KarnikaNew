import { CLEAR_PRODUCT_LIST_DATA, SET_LAST_PRODUCT_FILTER, SET_LAST_PRODUCT_STATE, SET_PRODUCT_LIST, SET_PRODUCT_LIST_LAST_OFFSET, SET_PRODUCT_LIST_VIEW_TYPE } from "../types"

const initialState = {
    product_list: [],
    is_list_view_type_grid: true,
    last_screen_offset: 0,
    lastproductfilter: null
}

function productListReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCT_LIST:
            return { ...state, product_list: action.payload }

        case SET_PRODUCT_LIST_LAST_OFFSET:
            return { ...state, last_screen_offset: action.payload }

        case SET_PRODUCT_LIST_VIEW_TYPE:
            return { ...state, is_list_view_type_grid: action.payload }

        case SET_LAST_PRODUCT_FILTER:
            return { ...state, lastproductfilter: action.payload }

        case CLEAR_PRODUCT_LIST_DATA:
            return {...initialState}    

        default:
            return state
    }
}
export default productListReducer