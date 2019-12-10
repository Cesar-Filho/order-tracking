import api from '../config/api';
import { loadingStart, loadingStop } from './loading';

const INITIAL_STATE = {
  list: []
};

const types = {
  ORDERS_POSTED: 'ORDERS_POSTED',
  ORDERS_LISTED: 'ORDERS_LISTED'
};

export function save(obj) {
  const type = types.ORDERS_POSTED;
  const order = { ...obj, status: 'NOVO', createdAt: new Date() };
  return dispatch => {
    dispatch(loadingStart());
    api
      .post('orders', order)
      .then(resp => {
        dispatch({ type, payload: resp.data });
        dispatch(loadingStop());
      })
      .catch(e => dispatch(loadingStop()));
  };
}

export function getAll() {
  const type = types.ORDERS_LISTED;
  return dispatch => {
    dispatch(loadingStart());
    api
      .get('orders')
      .then(resp => {
        dispatch({ type, payload: resp.data });
        dispatch(loadingStop());
      })
      .catch(e => dispatch(loadingStop()));
  };
}

export function orderReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.ORDERS_POSTED:
      return { ...state, list: [...state.list, payload] };
    case types.ORDERS_LISTED:
      return { ...state, list: payload };
    default:
      return state;
  }
}
