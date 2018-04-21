import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import OrganizationEditPage from './pages/OrganizationEditPage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationSearchPage from './pages/OrganizationSearchPage';
// import Search from './pages/Search';
import ServicePage from './pages/ServicePage';

// import AdminChangeRequests from './pages/AdminChangeRequestsPage';
// import AdminDashboard from './pages/AdminDashboardPage';

// import configureStore from './store/configureStore';
// import { RequireAuth } from './components/Auth/RequireAuth';

function redirectToRoot(nextState, replace) {
  replace({
    pathname: '/',
  });
}

// Adapted from
// https://github.com/ReactTraining/react-router/issues/2019#issuecomment-256591800
// Note: When we upgrade to react-router 4.x, we should use
// https://github.com/ReactTraining/react-router/blob/v4.1.1/packages/react-router-dom/docs/guides/scroll-restoration.md
function scrollToTop(prevState, nextState) {
  if (nextState.location.action !== 'POP') {
    window.scrollTo(0, 0);
  }
}

export default (
  <Route path="/" component={App} onChange={scrollToTop} >
    <IndexRoute name="HomePage" component={HomePage} />
    {/* {/* <Route path="/login" name="login" component={LoginPage} /> */}
    <Route path="/resource/:resource" name="resource" component={OrganizationPage} />
    {/* <Route path="/resource/edit" name="editResource" component={OrganizationEditPage} /> */}
    {/* <Route path="/resource/new" name="newResource" component={OrganizationEditPage} /> */}
    <Route path="/resources" name="resources" component={OrganizationSearchPage} />
    {/* <Route path="/search" name="search" component={Search} /> */}
    <Route path="/services/:service" name="ServicePage" component={ServicePage} />
    {/* <Route path="/admin" name="Admin" component={RequireAuth(AdminDashboard)} /> */}
    {/* <Route path="/admin/changes" name="AdminChangeRequests" component={RequireAuth(AdminChangeRequests)} /> */} */}
    <Route path="*" onEnter={redirectToRoot} />
  </Route>
);
