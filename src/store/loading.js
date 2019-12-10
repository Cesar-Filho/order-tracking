const types = {
  start: 'LOADING_START',
  stop: 'LOADING_STOP'
};

const INITIAL_STATE = {
  loading: false,
  counter: 0
};

export const loadingStart = () => ({
  type: types.start
});

export const loadingStop = () => ({
  type: types.stop
});

export const loadingReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case types.start:
      return { ...state, counter: state.counter + 1, loading: true };
    case types.stop:
      if (state.counter > 1) {
        return { ...state, counter: state.counter - 1, loading: true };
      }
      return { ...state, counter: 0, loading: false };
    default:
      return state;
  }
};
