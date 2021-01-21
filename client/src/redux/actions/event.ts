import { Dispatch } from 'redux'
import axios from 'axios'
import {
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_SUCCEED,
  FETCH_EVENTS_FAILED,
  SearchParamsProps
} from '../../types'

export const fetchAllEvents = (searchParams: SearchParamsProps) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: FETCH_EVENTS_REQUESTED })
    const { data } = await axios.get('/api/v1/events', {
      params: {
        category: searchParams.category,
        lat: searchParams.location.lat,
        lng: searchParams.location.lng,
        distance: searchParams.distance
      }
    })
    return dispatch(fetchEventsSucceed(data))
  } catch (error) {
    return dispatch(fetchEventsFailed(error))
  }
}

const fetchEventsSucceed = (data: any) => {
  return {
    type: FETCH_EVENTS_SUCCEED,
    payload: data
  }
}

const fetchEventsFailed = (error: any) => {
  return {
    type: FETCH_EVENTS_FAILED,
    payload: error
  }
}
