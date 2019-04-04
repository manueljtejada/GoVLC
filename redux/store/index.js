import { createStore } from 'redux';
import * as utm from 'utm';

import rootReducer from '../reducers/index';

import data from '../../data/db.json';
import vias from '../../data/vias.json';

const places = data.features.map(place => {
  let address;
  const via = vias.find(v => v.codvia === parseInt(place.properties.codvia));

  if (via) {
    address = `${via.codtipovia} ${via.nomoficial}`;
  }

  return {
    ...place,
    address,
    coordinates: utm.toLatLon(...place.geometry.coordinates, 30, 'U'),
  };
});

const initialState = { places };

const store = createStore(rootReducer, initialState);

export default store;
