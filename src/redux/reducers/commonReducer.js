import { SET_PRODUCT_FILTER, CLEAR_PRODUCT_FILTER, SET_PROPS, SET_AVAILCREDIT_MODAL, SET_WELCOME_MODAL, SET_APP_LOGO, SET_MYFEED_FILTER } from "../types";

const initialState = {
    filter: {
        category: '',
        subCategory: '',
        season: '',
        brand: '',
        color: '',
        ageGroup: '',
        city: '',
        priceRange: '',
        sortPrice: 0,
        popularity: 0,
        whatsNew: 0,
        searchValue: '',
        page: 1
    },   
    appLogo: "",
    openAvailCreditModal: false,
    myfeedfilter: {
        category: '',
        subCategory: '',
        season: '',
        brand: '',
        color: '',
        ageGroup: '',
        city: '',
        priceRange: '',
        sortPrice: 0,
        popularity: 0,
        whatsNew: 0,
        searchValue: '',
        page: 1
    },
    all_filter_cleared: 0
}

function commonReducer(state = initialState, action) {
    // console.log('commonReducer',action);
    switch (action.type) {

        case SET_APP_LOGO:
            return {...state, appLogo: action.payload}
            
        case SET_PRODUCT_FILTER:
            return { ...state, filter: action.payload, all_filter_cleared: 1 }

        case SET_MYFEED_FILTER:
                return { ...state, myfeedfilter: action.payload, all_filter_cleared: 1 }

        case SET_AVAILCREDIT_MODAL:
            return { ...state, openAvailCreditModal: action.payload }

        case CLEAR_PRODUCT_FILTER:
            return {...state, filter: initialState.filter, myfeedfilter: initialState.myfeedfilter, all_filter_cleared: 0 }

        default:
            return state
    }
}

export default commonReducer