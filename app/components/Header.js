import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'
import { images } from '../assets';

class Header extends React.Component {
    submitSearch(e) {
      e.preventDefault();
      if(this.searchComponent.value) {
        browserHistory.push({
            pathname: '/resources',
            query: { query: this.searchComponent.value }
        });
        window.location.reload();
      }
      return false;
    }
  render() {
        return (
  <header>
    <nav className="navbar" role="navigation">
      <a className="navbar-brand" href="/">
        <img src={images.logoSmall} alt="Ask Darcel"/>
      </a>
      <div className="nav-search">
          <form onSubmit={this.submitSearch.bind(this)} className="search-container form-row" role="search">
            <input ref={(c) => this.searchComponent = c} type="text" className="search-field" placeholder="I'm looking for..." name="srch-term" id="srch-term" />
          </form>
      </div>
    </nav>
    <div className="push"></div>
  </header>
  )
  }
}

export default Header;
