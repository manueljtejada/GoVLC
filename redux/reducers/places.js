import {
  FETCH_PLACES,
  FETCH_PLACE,
  TOGGLE_VISITED,
  FILTER_PLACES,
  SORT_PLACES,
  ADD_IMAGE,
  ADD_REMINDER,
  SEARCH_PLACES,
} from '../actions/index';
import { distance } from '../../helpers/utils';

function places(state = [], action) {
  switch (action.type) {
    case TOGGLE_VISITED:
      console.log('Place has been visited!');
      return state;
    case SORT_PLACES:
      // Sort by name
      if (action.field === 'name') {
        return state
          .slice()
          .sort((a, b) => a.properties.nombre > b.properties.nombre);
      }

      // Sort by distance (relative to user location)
      if (action.field === 'distance' && action.userLocation) {
        return state
          .slice()
          .sort(
            (a, b) =>
              distance(
                a.coordinates.latitude,
                b.coordinates.longitude,
                action.userLocation.user.coords.latitude,
                action.userLocation.user.coords.longitude
              ) >
              distance(
                b.coordinates.latitude,
                b.coordinates.longitude,
                action.userLocation.user.coords.latitude,
                action.userLocation.user.coords.longitude
              )
          );
      }
      return state;

    case SEARCH_PLACES:
      const filtered = state.filter(place =>
        place.properties.nombre
          .toLowerCase()
          .includes(action.value.toLowerCase())
      );
      // return [
      //   ...state,
      //   state.filter(place =>
      //     place.properties.nombre
      //       .toLowerCase()
      //       .includes(action.value.toLowerCase())
      //   ),
      // ];
      return state;

    default:
      return state;
  }
}

export default places;
