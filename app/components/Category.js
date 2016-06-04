import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

var icons = require.context("../assets/images", true, /ic-.*\.png$/i);
var iconPathMap = {};
icons.keys().forEach(function (key) {
  iconPathMap[key.replace('./', '')] = icons(key);
});

var Category = React.createClass({
  render: function() {
    return (
    <div>
      <div className="col-lg-2 col-md-2 col-sm-2 hidden-xs category_option">
        <Link className="category_brand" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
          <img src={iconPathMap[this.props.image_path]} alt={this.props.name} className="img-responsive"/><br />
        </Link>
        {this.props.name}
      </div>
      <div className="hidden-lg hidden-md hidden-sm col-xs-12">
        <Link className="category_brand" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
          <button className="btn btn-default category_button" type="submit">
            <div className="col-xs-4 category_xs_button_image">
              <img src={iconPathMap[this.props.image_path]} alt={this.props.name} className="img-responsive"/><br />
            </div>
            <div className="col-xs-8 category_xs_text">
              {this.props.name}
            </div>
          </button>
        </Link>
      </div>
    </div>
    );
  }
});

export default Category;

