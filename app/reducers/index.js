import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';
import resource from './resourceReducer';
import services from './serviceReducer';
import auth from './authReducer';
import changeRequestReducer from './changeRequestReducer';
import userReducer from './userReducer';
import forms from '../reducers/formConfig';

const rootReducer = combineReducers({
  resource,
  services,
  auth,
  forms: combineForms(forms, 'forms'),
  changeRequestReducer,
  routing: routerReducer,
  user: userReducer
});

export default rootReducer;
