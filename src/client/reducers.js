import { combineReducers } from 'redux';

import { RECEIVE_SHORT } from './actions';

const urlReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SHORT:
    console.log(action.payload);
      return [action.payload, ...state];
    default: 
      return state;
  }
}

export default combineReducers({urls:  urlReducer});