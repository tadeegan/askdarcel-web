
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
        <CategoryList categories={categories} />
      </div>
    );
  }
});

var CategoryList = React.createClass({
  render: function() {
  
    var categoryNodes = this.props.categories.map(function(category) {
      return (
        <Category name={category.name} key={category.id} categoryid={category.id} />
      );
    });
    
    return (
      <div className="CategoryList container">
        <h1>Find Community Resources</h1>
        <div className="category_shelterBox">
          <p className="category_title">Select a category:</p>
          <ul className="category_list">
            {categoryNodes}
          </ul>
        </div>
      </div>
    );
  }
});

var Category = React.createClass({
  render: function() {
    return  (
      <li className="category_list_item">
        <div className="category-name">
          <Link className="category_brand" to={{ pathname: "resources", query: { categoryid: this.props.categoryid } }} >
            <span>{this.props.name}</span> 
          </Link>
        </div>
      </li>
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
