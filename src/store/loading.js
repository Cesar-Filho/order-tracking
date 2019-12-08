const typeLoading = {
  start: 'LOADING_START',
  stop: 'LOADING_STOP'
};

const INITIAL_STATE = {
  loading: false,
  counter: 0
};

export const loadingStart = () => ({
  type: typeLoading.start
});

export const loadingStop = () => ({
  type: typeLoading.stop
});

export const loadingReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case typeLoading.start:
      return { ...state, counter: state.counter + 1, loading: true };
    case typeLoading.stop:
      if (state.counter > 1) {
        return { ...state, counter: state.counter - 1, loading: true };
      }
      return { ...state, counter: 0, loading: false };
    default:
      return state;
  }
};
