import { CLEAR_CREDIT_AGENCIES, SET_CREDIT_AGENCIES, SET_RUPIFI_ACCOUNT_STATUS, SET_RUPIFI_CREDIT_BALANCE, SET_RUPIFI_CREDIT_LIMIT, SET_RUPIFI_MARCHANT_ID, SET_RUPIFI_REPAYMENT_URL, SET_RUPIFI_SOA_URL } from "../types";

const initialState = {
    credit_agencies: [],
    rupifi_credit_balance: 0,
    rupifi_credit_limit: 0,
    rupifi_merchant_id: '',
    rupifi_account_status: '',
    rupifi_soa_url: '',
    rupifi_repayment_url: ''
}

function applyForCreditReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CREDIT_AGENCIES:
            return { ...state, credit_agencies: action.payload }

        case SET_RUPIFI_CREDIT_LIMIT:
            return { ...state, rupifi_credit_limit: action.payload }

        case SET_RUPIFI_CREDIT_BALANCE:
            return { ...state, rupifi_credit_balance: action.payload }

        case SET_RUPIFI_MARCHANT_ID:
            return { ...state, rupifi_merchant_id: action.payload }

        case SET_RUPIFI_ACCOUNT_STATUS:
            return { ...state, rupifi_account_status: action.payload }

        case SET_RUPIFI_REPAYMENT_URL:
            return {...state, rupifi_repayment_url: action.payload}
                        
        case SET_RUPIFI_SOA_URL:
            return { ...state, rupifi_soa_url: action.payload }

        case CLEAR_CREDIT_AGENCIES:
            return initialState

        default:
            return state
    }
}

export default applyForCreditReducer

