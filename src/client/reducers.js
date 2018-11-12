import { combineReducers } from 'redux';

import { RECEIVE_SHORT, RECEIVE_ERROR, STATUS_ERROR, STATUS_READY, STATUS_LOADING } from './actions';

const urlReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SHORT:
      console.log(action.payload);
      return [action.payload, ...state];
    default: 
      return state;
  }
}

const errorReducer = (state = '', action) => {
  switch(action.type) {
    case RECEIVE_ERROR:
      return action.payload;
    default:
      return state;
  }
}

const statusReducer = (state = '', action) => {
  switch(action.type) {
    case STATUS_READY:
    case STATUS_LOADING:
    case STATUS_ERROR:
      return action.type;
    default:
      return state;
  }
}

export default combineReducers({urls:  urlReducer, error: errorReducer, status: statusReducer});