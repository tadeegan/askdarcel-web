import React from 'react';
import { Route, Link, browserHistory, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
import App from './components/App';
import CategoryPage from './components/Find/FindPage';
import ResourcesTable from './components/Search/ResourcesTable';
import Resource from './components/Resource/Resource';
import EditSections from './components/Edit/EditSections';
import Login from './components/User/Login';
import Google from './utils/google';
import CreateAccount from './components/User/CreateAccount';
import TestAuth from './components/User/TestAuth';
import Admin from './components/Admin/Admin';

import { RequireAuth } from './components/Auth/RequireAuth';


function redirectToRoot (nextState, replace) {
  replace({
    pathname: '/',
  });
};


export default (
  <Route path="/" component={ App } >
    <IndexRoute component={ CategoryPage } />
    <Route name="resources" path="/resources" component={ ResourcesTable } />
    <Route name="editResource" path="/resource/edit" component={ EditSections } />
    <Route name="resource" path="/resource" component={ Resource }  />
    <Route name="admin" path="/admin" component={ RequireAuth(Admin) } />
    <Route name="login" path="/login" component={ Login } />
    <Route path="*" onEnter={ redirectToRoot } />
  </Route>
);
