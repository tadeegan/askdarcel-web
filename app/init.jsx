import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store/configureStore';
import routes from './routes';

require('./styles/main.scss');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store} key="provider">
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));
