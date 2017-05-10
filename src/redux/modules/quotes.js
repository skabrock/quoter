import { createReducer } from '../utils/createReducer';
import data from '../../data';

const initialState = data;

export default createReducer({

  ADD_QUOTE: (state, { id, body, author }) => ([
    ...state,
    {
      id,
      author,
      quote: body
    }
  ])

}, initialState);