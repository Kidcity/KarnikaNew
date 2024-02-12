import { CLEAR_ORDER_LIST_DATA, STORE_ORDER_LIST } from "../types";

export const storeOrderListAction = data => dispatch => {
    dispatch({
        type: STORE_ORDER_LIST,
        payload: data
    })
}

export const clearOrderListData = data => dispatch => {
    dispatch({
        type: CLEAR_ORDER_LIST_DATA,
    })
}