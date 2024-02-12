import { STORE_ORDER_LIST, CLEAR_ORDER_LIST_DATA } from "../types";


const initialState = {
    order_list: []
}

function orderListReducer(state = initialState, action) {

    switch (action.type) {
        case STORE_ORDER_LIST:
            return { order_list: [...action.payload] }

        case CLEAR_ORDER_LIST_DATA:
            return initialState

        default:
           return state
    }
}

export default orderListReducer