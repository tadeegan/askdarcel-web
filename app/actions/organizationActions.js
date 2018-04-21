import { get } from 'utils/DataService';
import {
  ORGANIZATION_LOAD_REQUEST,
  ORGANIZATION_LOAD_SUCCESS,
  ORGANIZATION_LOAD_FAIL,
} from './actionTypes';

export function fetchOrganization(id) {
  return (dispatch) => {
    dispatch({ type: ORGANIZATION_LOAD_REQUEST });
    return get(`/api/resources/${id}`).then((resp) => {
      const { resource } = resp;
      console.log(resource)
      dispatch({ type: ORGANIZATION_LOAD_SUCCESS, resource });
    })
    .catch((err) => {
      dispatch({ type: ORGANIZATION_LOAD_FAIL, err });
    });
  };
}

export function fetchOrganizations() {
  
}
