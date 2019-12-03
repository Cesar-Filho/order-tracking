import api from '../config/api'

export function getAll(params) {
  const type = 'ORDERS_LISTED'
  return (
    { type, payload: null },
    dispatch => {
      api
        .get(`/`)
        .then(resp => {
          dispatch({ type, payload: resp.data })
        })
        .catch(e => {
          dispatch({ type, payload: {} })
          console.log(e)
        })
    }
  )
}

export function orderReducer(state = null, { type, payload }) {
  switch (type) {
    case 'ORDERS_LISTED':
      return { ...state, list: payload }
    default:
      return state
  }
}
