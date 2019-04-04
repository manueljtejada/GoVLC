export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const TOGGLE_VISITED = 'TOGGLE_VISITED';
export const FILTER_PLACES = 'FILTER_PLACES';
export const SORT_PLACES = 'SORT_PLACES';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_REMINDER = 'ADD_REMINDER';

// Get all places
export function getAllPlaces() {
  return { type: FETCH_PLACES };
}

// Get place by ID
export function getPlace(id) {
  return {
    type: FETCH_PLACE,
    id,
  };
}

// Mark a place as visited
export function toggleVisited(id) {
  return {
    type: TOGGLE_VISITED,
    id,
  };
}

// Filter list of places
export function filterPlaces(filter, data) {
  return {
    type: FILTER_PLACES,
    filter,
    data,
  };
}

// Sort list of places by field and order (ASC or DESC)
export function sortPlaces(field, order) {
  return {
    type: SORT_PLACES,
    field,
    order,
  };
}

// Add an image to a place
export function addImage(image, placeId) {
  return {
    type: ADD_IMAGE,
    image,
    placeId,
  };
}

// Add a reminder to a place
export function addReminder(time, placeId) {
  return {
    type: ADD_REMINDER,
    placeId,
  };
}
