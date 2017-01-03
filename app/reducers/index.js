 import { combineReducers } from 'redux';
import resource from './resourceReducer';
import auth from './authReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  resource,
  auth,
  routing: routerReducer,
});

export default rootReducer;
