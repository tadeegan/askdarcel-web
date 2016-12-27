import { combineReducers } from 'redux';
import resource from './resourceReducer';
import {configure, authStateReducer} from "redux-auth";

const rootReducer = combineReducers({
  resource,
  auth: authStateReducer,
});

export default rootReducer;
