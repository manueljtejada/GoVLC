export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACE = 'FETCH_PLACE';
export const TOGGLE_VISITED = 'TOGGLE_VISITED';
export const FILTER_PLACES = 'FILTER_PLACES';
export const SEARCH_PLACES = 'SEARCH_PLACES';
export const SORT_PLACES = 'SORT_PLACES';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_REMINDER = 'ADD_REMINDER';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';

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

// Search places by name
export function searchPlaces(value) {
  return {
    type: SEARCH_PLACES,
    value,
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

// Set user location
export function setUserLocation(coordinates) {
  return {
    type: SET_USER_LOCATION,
    coordinates,
  };
}
