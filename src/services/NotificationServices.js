import Base from './Base.service'
import { NOTIFICATION_HISTORY, NOTIFICATION_UNREAD_COUNT, NOTIFICATION_UPDATE } from './Slug'
import { store } from '../redux/store'
import { setNotifications, setTotalNotificationsPagination, setUnreadNotificationsCount } from '../redux/actions/notificationAction';

class NotificationServices extends Base {

  _getNotificationService(param) {

    return new Promise((resolve, reject) => {
      this.post(NOTIFICATION_HISTORY, param).then(response => {


        if (response.data && response.data.data && response.data.data.data) {
          let notifications = response.data.data.data
          const total_page = response.data.data.total_page

          if (param.page > 1) {
            const state_notifications = store.getState().notificationReducer.notifications
            if (state_notifications.length > 0) {
              notifications = [...state_notifications, ...notifications]
            }
          }
          store.dispatch(setNotifications(notifications))
          store.dispatch(setTotalNotificationsPagination(total_page))
          resolve(true)
        } else {
          reject({
            message: "Something went wrong."
          })
        }
      }, error => {
        // console.log(error);
        reject(error)
      })
    })
  }

  _changeStatusNotificationService(param) {
    return new Promise((resolve, reject) => {
      this.post(NOTIFICATION_UPDATE, param).then(response => {
        if (response?.data?.data?.status) {       
          const total_unread_notification = store.getState().notificationReducer.total_unread_notification
          store.dispatch(setUnreadNotificationsCount( (+total_unread_notification - 1) ))   
          resolve(true)
        }else{
          reject({
            message: "Something went wrong."
          })
        }
      }, error => {
        reject(error)
      })
    })
  }

  _unreadNotificationService(param) {
    return new Promise((resolve, reject) => {
      this.post(NOTIFICATION_UNREAD_COUNT, param).then(response => {
        if (response?.data?.data?.status) {
          store.dispatch(setUnreadNotificationsCount(response?.data?.data?.count ?? 0))
          resolve(true)
        }else{
          reject({
            message: "Something went wrong."
          })
        }
      }, error => {
        reject(error)
      })
    })
  }
}

export default new NotificationServices()