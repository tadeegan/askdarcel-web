import { SERVICE_LOAD_REQUEST, SERVICE_LOAD_SUCCESS, SERVICE_LOAD_FAILURE } from 'actions/actionTypes';
import { get } from 'utils/DataService';

export function getService(id) {
  return async dispatch => {
    try {
      dispatch({ type: SERVICE_LOAD_REQUEST });
      // TODO If we already have the service in store can we cache?
      const { service } = await get(`/api/services/${id}`);
      dispatch({ type: SERVICE_LOAD_SUCCESS, service });
    } catch (e) {
      // TODO Handle error properly and consistently
      dispatch({ type: SERVICE_LOAD_FAILURE });
    }
  };
}
