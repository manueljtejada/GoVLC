import { combineReducers } from 'redux';
import * as places from '../../data/db.json';

const initialState = { places };

const rootReducer = (state = initialState, action) => {
  return state;
};

export default rootReducer;