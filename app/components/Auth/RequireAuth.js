import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

export function RequireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated);
    }
    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let loginRedirect = this.props.location.pathname;
        browserHistory.push(`/login?next=${loginRedirect}`);
      }
    }
    render () {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
          </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }
  return connect(mapStateToProps)(AuthenticatedComponent);

}
