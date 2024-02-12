const { SET_NOTIFICATIONS, CLEAR_NOTIFICATIONS, SET_TOTAL_NOTIFICATION_PAGINATION, SET_NOTIFICATIONS_UNREAD_COUNT } = require("../types");

const initialState = {
  notifications: [],
  total_page: 0,
  total_unread_notification: 0
}


function notificationReducer(state = initialState, action) {

  switch (action.type) {

    case SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload }

    case SET_TOTAL_NOTIFICATION_PAGINATION:
      return { ...state, total_page: action.payload }

    case SET_NOTIFICATIONS_UNREAD_COUNT:
      return { ...state, total_unread_notification: action.payload }

    case CLEAR_NOTIFICATIONS:
      return initialState

    default:
      return state
  }
}

export default notificationReducer