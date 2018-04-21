import * as types from './actionTypes';
// import * as authApi from '../api/auth';
import { browserHistory } from 'react-router';

function adminLoginRequest() {
  return {
    type: types.ADMIN_LOGIN_REQUEST,
  };
}

function adminLoginSuccess() {
  return {
    type: types.ADMIN_LOGIN_SUCCESS,
  };
}

function adminLoginError() {
  return {
    type: types.ADMIN_LOGIN_ERROR,
  };
}

export function adminLogin(email, password) {
  // console.log('em psw', email, password);
  return fetch('/api/admin/auth/sign_in', {
    method: 'post',
    headers: {
      "Content-type": "application/json", 
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}

export default {
  adminLogin(email, password) {
    return dispatch => {
      dispatch(adminLoginRequest());
      adminLogin(email, password)
        .then(response => {
          if ( response.status === 200) {
            dispatch(adminLoginSuccess());
            const headers = response.headers;
            localStorage.setItem('authHeaders', JSON.stringify({
              'access-token': headers.get('access-token'),
              client: headers.get('client'),
              uid: headers.get('uid'),
            }));
            browserHistory.push('/admin/changes');
          } else if (response.status === 401) {
            alert('Incorrect email or password, please try again.');
            dispatch(adminLoginError());
          }
        })
        .catch(error => {
          console.log('err', error);
        })
    }
  }
}
