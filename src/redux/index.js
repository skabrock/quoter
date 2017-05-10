import { combineReducers } from 'redux';

import quotes from './modules/quotes';
import authors from './modules/authors';
import history from './modules/history';

export default combineReducers({
  quotes,
  authors,
  history
})