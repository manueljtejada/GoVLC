import { combineReducers } from 'redux';
import places from './places';
import user from './user';

const rootReducer = combineReducers({ places, user });

export default rootReducer;
