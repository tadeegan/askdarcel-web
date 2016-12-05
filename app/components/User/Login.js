import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'
import { images } from '../../assets';

class Login extends React.Component {
  render() {
    return (
    <div className="login-page">
      <div className="auth-container">
        <header>
          <p className="splash-instructions">Enter your username and password</p>
        </header>
        <div className="splash-actions">
          <div className="input-container">
            <input type="text" placeholder="username" />
          </div>
          <div className="input-container">
            <input type="text" placeholder="password" />
          </div>
          <a className="login-btn">Login</a>
        </div>
      </div>
    </div>
    )
  }
}

export default Login;
