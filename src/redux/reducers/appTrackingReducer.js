import { CLEAR_APP_ACTIVITY, SET_APP_ACTIVITY } from "../types";

const initialState = {
  activity_obj: null,
  active_screen_name: "",
  duration: 0,
  action_type: "",
  action_id: "",
  city_id: ''
}

function appTrackingReducer(state = initialState, action) {

  switch (action.type) {

    case SET_APP_ACTIVITY:
      return { ...state, 
        // activity_obj: action.payload, 
        // previous_screen_name        
        // active_screen_name: action.payload?.active_screen_name,
        duration: action.payload?.duration,
        action_type: action.payload?.action_type,
        action_id: action.payload?.action_id,
        city_id: action.payload?.city_id,

       }

    case CLEAR_APP_ACTIVITY:
      return initialState

    default:
      return state
  }
}

export default appTrackingReducer