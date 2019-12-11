import api from '../config/api';
import { loadingStart, loadingStop } from './loading';

const INITIAL_STATE = {
    list: []
};

const types = {
    ORDERS_POSTED: 'ORDERS_POSTED',
    ORDERS_LISTED: 'ORDERS_LISTED',
    ORDER_DELETED: 'ORDER_DELETED',
    ORDER_NEXT_STATUS: 'ORDER_NEXT_STATUS',
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

export function deleted(obj) {
    const type = types.ORDER_DELETED;
    const order = { ...obj, status: 'EXCLUIDO', deletedAt: new Date() };
    return dispatch => {
        dispatch(loadingStart());
        api
            .put(`orders/${order.id}`, order)
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
            })
            .catch(e => dispatch(loadingStop()));
    };
};

export function next(obj) {
    const type = types.ORDER_NEXT_STATUS;
    const nextStatus = {
        NOVO: { status: 'PREPARANDO' },
        PREPARANDO: { status: 'CONFERENCIA' },
        CONFERENCIA: { status: 'PRONTO', readedAt: new Date() }
    }
    const order = { ...obj, ...nextStatus[obj.status] };
    return dispatch => {
        dispatch(loadingStart());
        api
            .put(`orders/${order.id}`, order)
            .then(resp => {
                dispatch({ type, payload: resp.data });
                dispatch(loadingStop());
            })
            .catch(e => dispatch(loadingStop()));
    };
};

export function orderReducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case types.ORDERS_POSTED:
            return { ...state, list: [...state.list, payload] };
        case types.ORDERS_LISTED:
            return { ...state, list: payload };
        case types.ORDER_DELETED:
            return { ...state, list: state.list.filter(l => l.id !== payload.id) };
        case types.ORDER_NEXT_STATUS:
            return { ...state, list: [...state.list.filter(l => l.id !== payload.id), payload] };
        default:
            return state;
    }
}
