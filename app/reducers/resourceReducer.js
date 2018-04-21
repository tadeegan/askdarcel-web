import * as types from '../actions/actionTypes';

const initialState = {
  organizationList: [],
  activeOrganization: null,
};

export default function resourceReducer(state = initialState, action) {
  switch (action.type) {
    case types.ORGANIZATION_LOAD_SUCCESS:
      return { ...state, activeOrganization: action.resource };
    default:
      return state;
  }
}
