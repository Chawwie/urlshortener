
import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import  { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'; 

import App from './components/App';

import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));