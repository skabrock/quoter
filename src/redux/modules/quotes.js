import { createReducer } from '../utils/createReducer';

const initialState = {
  quotes: {},
  quotes_loaded: false
};

export default createReducer({

  SET_QUOTES: (state, { payload }) => ({
    ...state,
    quotes: payload,
    quotes_loaded: true
  })

}, initialState);