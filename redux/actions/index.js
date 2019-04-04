export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const FILTER_PLACES = 'FILTER_PLACES';

export function getAllPlaces() {
  return { type: FETCH_PLACES };
}

export function getPlace(id) {
  return {
    type: FETCH_PLACE,
    id,
  };
}

export function filterPlaces(filter, data) {
  return {
    type: FILTER_PLACES,
    filter,
    data,
  };
}
