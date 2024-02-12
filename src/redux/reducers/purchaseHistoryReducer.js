import { CLEAR_PURCHASE_HISTORY_DATA, SET_PURCHASE_HISTORY } from "../types";
const initialState = {
    no_of_details: '',
    quantity_set: '',
    quantity_piece: '',
    total_amount: ''
}

function purchaseHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PURCHASE_HISTORY:
            return {
                no_of_details: action.payload.no_of_details,
                quantity_set: action.payload.quantity_set,
                quantity_piece: action.payload.quantity_piece,
                total_amount: action.payload.total_amount
            }

        case CLEAR_PURCHASE_HISTORY_DATA:
            return initialState

        default:
            return state
    }
}

export default purchaseHistoryReducer