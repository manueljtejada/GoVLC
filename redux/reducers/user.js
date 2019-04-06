import { SET_USER_LOCATION } from '../actions/index';

function user(state = {}, action) {
  if (action.type === SET_USER_LOCATION) {
    return Object.assign({}, state, { user: action.coordinates });
  }
  return state;
}

export default user;
