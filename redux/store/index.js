import { createStore } from 'redux';
import * as utm from 'utm';

import rootReducer from '../reducers/index';

import data from '../../data/db.json';

import { getCategory, getAddress } from '../../helpers/utils';

const places = data.features.map(place => {
  const address = getAddress(place.properties.codvia);
  const category = getCategory(place.properties.nombre);
  const coordinates = utm.toLatLon(...place.geometry.coordinates, 30, 'U');

  return {
    ...place,
    address,
    category,
    coordinates,
  };
});

const initialState = { places, user: {} };

const store = createStore(rootReducer, initialState);

export default store;
