import React from 'react';
import { images } from '../assets';
import { browserHistory } from 'react-router'


function LargeHeader() {
  var submitSearch = function() {
    browserHistory.push({
        pathname: '/resources',
        query: { query: document.getElementById("srch-term").value }
    });
  };
  return (
    <header className="header-large">
      <nav className="navbar navbar-default" role="navigation">
        <a className="navbar-brand" href="/#">
          <img src={images.logoSmall} alt="Ask Darcel"/>
        </a>
      </nav>
      <div className="push"></div>
      <div className="hero" style={{backgroundImage: 'url(' + images.background +')'}} role="banner">
        <h1>
          Find the best community<br />
          resources for your needs
        </h1>
        <div className="search-container form-row" role="search">
          <input type="text" className="search-field" placeholder="I'm looking for..." name="srch-term" id="srch-term" />
          <input type="text" className="location-field" placeholder="Near me" name="srch-location" id="srch-location" />
          <button onClick={submitSearch} id="largeheader_searchbutton" className="button search" type="submit"><i className="material-icons">search</i> <span>Search</span></button>
        </div>
      </div>
    </header>

  );
}

export default LargeHeader;
