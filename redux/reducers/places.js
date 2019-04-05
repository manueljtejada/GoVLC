import {
  FETCH_PLACES,
  FETCH_PLACE,
  TOGGLE_VISITED,
  FILTER_PLACES,
  SORT_PLACES,
  ADD_IMAGE,
  ADD_REMINDER,
} from '../actions/index';

function places(state = [], action) {
  switch (action.type) {
    case TOGGLE_VISITED:
      console.log('Place has been visited!');
      return state;

    default:
      return state;
  }
}

export default places;
