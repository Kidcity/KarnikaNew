import { CLEAR_CREDIT_AGENCIES, SET_CREDIT_AGENCIES, SET_RUPIFI_ACCOUNT_STATUS, SET_RUPIFI_CREDIT_BALANCE, SET_RUPIFI_CREDIT_LIMIT, SET_RUPIFI_MARCHANT_ID, SET_RUPIFI_REPAYMENT_URL, SET_RUPIFI_SOA_URL } from "../types";

export const setCreditAgenciesAction = (data) => {
    return{
        type: SET_CREDIT_AGENCIES,
        payload: data
    }
}

export const setRupifiCreditBalanceAction = (data) => {
    return{
        type: SET_RUPIFI_CREDIT_BALANCE,
        payload: data
    }
}

export const setRupifiRepaymentURLAction = (data) => {
    return{
        type: SET_RUPIFI_REPAYMENT_URL,
        payload: data
    }
}

export const setRupifiSOAURLAction = (data) => {
    return{
        type: SET_RUPIFI_SOA_URL,
        payload: data
    }
}

export const setRupifiCreditLimitAction = (data) => {
    return{
        type: SET_RUPIFI_CREDIT_LIMIT,
        payload: data
    }
}

export const setRupifiMarchantIDAction = (data) => {
    return{
        type: SET_RUPIFI_MARCHANT_ID,
        payload: data
    }
}

export const setRupifiAccountStatusAction = (data) => {
    return{
        type: SET_RUPIFI_ACCOUNT_STATUS,
        payload: data
    }
}

export const clearCreditAgenciesAction = (data) => {
    return{
        type: CLEAR_CREDIT_AGENCIES,
        payload: data
    }
}