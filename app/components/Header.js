
import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="header_root">
      <div className="header_container">
        <Link className="header_brand" to="/">
          <span className="header_brandTxt">Ask Darcel</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
