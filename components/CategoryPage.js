
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Gmap from './resources/Map.js';
import LargeHeader from './LargeHeader.js'
import Footer from './Footer.js'

var categories = [];
      
var CategoryBox = React.createClass({
  loadCategoriesFromServer: function() {  
    var callback = function callback(response, textStatus, jqXHR) {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          categories = JSON.parse(httpRequest.responseText);
          this.setState({categories: categories});
        } else {
          console.log('error...');
        }
      }
    }.bind(this);

    var tempUrl = '/api/categories';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', tempUrl, true);
    httpRequest.onreadystatechange = callback;
    httpRequest.send(null);
  },

  componentDidMount: function() {
    this.loadCategoriesFromServer();
  },

  render: function() {
    return (
      <div>
        <LargeHeader />
        <CategoryList categories={categories} />
        <Footer />
      </div>
    );
  }
});

var CategoryList = React.createClass({
  render: function() {
  
    var categoryNodes = this.props.categories.map(function(category) {
      return (
        <Category name={category.name} key={category.id} categoryid={category.id} image_path={category.image_path}/>
      );
    });
    
    return (
      <div className="CategoryList container">
        <div className="browseCategoriesText">
          Browse Categories
        </div>
        <div className="row">
          {categoryNodes}
        </div>
      </div>
    );
  }
});

var Category = React.createClass({
  render: function() {
    return  (
    <div>
      <div className="col-lg-2 col-md-2 col-sm-2 hidden-xs category_option">
          <Link className="category_brand" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
              <img src={'assets/images/' + this.props.image_path} alt="boohoo" className="img-responsive"/><br />
          </Link>
          {this.props.name}
      </div>
      <div className="hidden-lg hidden-md hidden-sm col-xs-12">
        <Link className="category_brand" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
          <button className="btn btn-default category_button" type="submit">
            <div className="col-xs-4 category_xs_button_image">
                <img src={'assets/images/' + this.props.image_path} alt="boohoo" className="img-responsive"/><br />
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

class ContentPage extends Component {
  render() {
    return (
      <CategoryBox />
    );
  }

}

export default ContentPage;
