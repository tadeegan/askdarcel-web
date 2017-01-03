import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/App';
import CategoryPage from './components/Find/FindPage';
import ResourcesTable from './components/Search/ResourcesTable';
import Resource from './components/Resource/Resource';
import EditSections from './components/Edit/EditSections';
import Login from './components/User/Login';
import CreateAccount from './components/User/CreateAccount';
import TestAuth from './components/User/TestAuth';


import Google from './utils/google';

import routes from './routes';

require('./styles/main.scss');

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)


function redirectToRoot (nextState, replace) {
  replace({
    pathname: '/',
  });
};


ReactDOM.render((
  <Provider store={store} key="provider">
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'));


