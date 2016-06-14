import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { images } from '../assets';

var Category = React.createClass({
  render: function() {
    return (
    <li className="category-item">
      <Link className="category-button" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
        <div className="category-button-content">
          <div className="category-button-icon">
            <img src={images.icon(this.props.name)} alt={this.props.name} className="img-responsive"/>
          </div>
          <h5 className="category-button-title">{this.props.name}</h5>
        </div>
      </Link>
    </li>
    );
  }
});

export default Category;
