import api from '../config/api'

const INITIAL_STATE = {
  list: []
}

const types = {
  ORDERS_POSTED: 'ORDERS_POSTED'
}

export function save(obj) {
  const type = types.ORDERS_POSTED
  return dispatch => {
    api
      .post('posts', obj)
      .then(resp => dispatch({ type, payload: resp.data }))
      .catch(e => console.log(e))
  }
}

export function orderReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'ORDERS_POSTED':
      return { ...state, list: [...state.list, payload] }
    default:
      return state
  }
}
