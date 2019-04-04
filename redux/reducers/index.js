import { combineReducers } from 'redux';
import { FETCH_PLACES, FETCH_VIAS } from '.';

const rootReducer = (state, action) => {
  switch (action) {
    case FETCH_PLACES:
      return state.places;
    default:
      return state;
  }
};

export default rootReducer;
