// import { get } from 'utils/DataService';

export const USER_GET_LOCATION = 'USER_GET_LOCATION';
export const USER_GET_LOCATION_SUCCESS = 'USER_GET_LOCATION_SUCCESS';
export const USER_GET_LOCATION_FAIL = 'USER_GET_LOCATION_FAIL';

const initialState = {
  session: null,
  location: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}

// Calculate the current users location
export function getUserLocation() {

}
