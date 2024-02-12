import { CLEAR_APP_ACTIVITY, SET_APP_ACTIVITY } from "../types"

export const setActivityAction = data => {    
  return {
      type: SET_APP_ACTIVITY,
      payload: data
  }
}

export const clearActivityAction = data => {    
  return {
      type: CLEAR_APP_ACTIVITY
  }
}