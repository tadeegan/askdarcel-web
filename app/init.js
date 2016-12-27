import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import {AuthGlobals} from 'redux-auth/default-theme';
import { configure, authStateReducer } from 'redux-auth';

import App from './components/App';
import CategoryPage from './components/Find/FindPage';
import ResourcesTable from './components/Search/ResourcesTable';
import Resource from './components/Resource/Resource';
import EditSections from './components/Edit/EditSections';
import Login from './components/User/Login';
import CreateAccount from './components/User/CreateAccount';
import TestAuth from './components/User/TestAuth';
import SignIn from './components/User/SignIn';

import Google from './utils/google';

import router from './router';

require('./styles/main.scss');

const store = configureStore();

function redirectToRoot (nextState, replace) {
  replace({
    pathname: '/',
  });
};


function requireAuth(store, nextState, replace, next) {
  if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
    replace('/');
  }
  next();
}


const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ CategoryPage } />
      <Route name="resources" path="/resources" component={ ResourcesTable } />
      <Route name="editResource" path="/resource/edit" component={ EditSections } />
      <Route name="resource" path="/resource" component={ Resource }  />
      <Route name="testAuth" path="/testAuth" component={ TestAuth } onEnter={requireAuth.bind(this, store)} />
      <Route name="login" path="/admin/login" component={ SignIn } />

      <Route path="*" onEnter={ redirectToRoot } />
    </Route>
  </Router>
);


store.dispatch(configure(
  {
    apiUrl: '/api/admin',
  },
  {
    serverSideRendering: false, 
    clientOnly: true,
  }
  )).then(() => {

    ReactDOM.render((
      <Provider store={store} >
        {routes}
      </Provider>
    ), document.getElementById('root'));
});

