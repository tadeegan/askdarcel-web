// import * as types from './actionTypes';
// import * as authApi from '../api/auth';
// import { browserHistory } from 'react-router';

export default {
  setUserLocation(location) {
    return {
      type: types.SET_USER_LOCATION,
      location,
    };
};
