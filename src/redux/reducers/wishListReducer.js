import { SET_WISHLIST_COUNT, CLEAR_WISHLIST_COUNT } from "../types"

const inititalState = {
    total_wishlist_count : 0
}

function wishListReducer(state = inititalState, action){
    switch (action.type) {
        case SET_WISHLIST_COUNT:
            return { total_wishlist_count: action.payload }
        case CLEAR_WISHLIST_COUNT: 
            return {...inititalState}
        default:
            return state
    }
}

export default wishListReducer