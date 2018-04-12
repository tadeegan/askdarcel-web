import React from 'react';

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li className="footer_text">
          © 2016-{ new Date().getFullYear() }
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
