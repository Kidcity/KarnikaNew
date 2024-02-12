import { setActivityAction, clearActivityAction } from '../redux/actions/appTrackingAction'
import { store } from '../redux/store'

export const setScreenActivity = (activity_obj) => {
  store.dispatch(setActivityAction({
    action_type: activity_obj?.action_type,
    action_id: activity_obj?.action_id,
    city_id: activity_obj?.city_id ?? "",
  }))
}

export const clearScreenActivity = async () => {
  await store.dispatch(clearActivityAction())
}



