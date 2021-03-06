import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux';
import HomeWrapper from './components/Pages/HomeWrapper';
import 'normalize.css/normalize.css';
import './defaults.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/:quote_id*" component={HomeWrapper}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
