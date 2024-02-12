import { SET_NOTIFICATIONS, CLEAR_NOTIFICATIONS, SET_TOTAL_NOTIFICATION_PAGINATION, SET_NOTIFICATIONS_UNREAD_COUNT } from "../types"


export const setTotalNotificationsPagination = data => {
  return {
    type: SET_TOTAL_NOTIFICATION_PAGINATION,
    payload: data
  }
}

export const setUnreadNotificationsCount = data => {
  return {
    type: SET_NOTIFICATIONS_UNREAD_COUNT,
    payload: data
  }
}

export const setNotifications = data => {
  return {
    type: SET_NOTIFICATIONS,
    payload: data
  }
}

export const clearNotifications = data => {
  return {
    type: CLEAR_NOTIFICATIONS,
  }
}