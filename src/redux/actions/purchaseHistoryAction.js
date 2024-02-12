import { CLEAR_PURCHASE_HISTORY_DATA, SET_MINIMUN_ORDER_PRICE, SET_PURCHASE_HISTORY } from "../types";

export const setPurchaseHistoryDataAction = data => dispatch => {
    dispatch({
        type: SET_PURCHASE_HISTORY,
        payload: data
    })
}

export const setMinimunOrderPriceAction = data => dispatch => {
    dispatch({
        type: SET_MINIMUN_ORDER_PRICE,
        payload: data
    })
}

export const clearPurchaseHistoryData = data => dispatch => {
    dispatch({
        type: CLEAR_PURCHASE_HISTORY_DATA,
        payload: data
    })
}