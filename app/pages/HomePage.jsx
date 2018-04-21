import React from 'react';
import Footer from 'components/ui/Footer';
import Navigation from 'components/ui/Navigation';
import FindHeader from 'components/search/FindHeader';
import { CategoryLink } from 'components/layout'

let categories = [];

class CategoryBox extends React.Component {
  componentDidMount() {
    this.loadCategoriesFromServer();
  }

  loadCategoriesFromServer() {
    const callback = function callback(response, textStatus, jqXHR) {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          categories = JSON.parse(httpRequest.responseText).categories;
          this.setState({ categories });
        } else {
          console.log('error...');
        }
      }
    }.bind(this);

    const tempUrl = '/api/categories?top_level=true';
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', tempUrl, true);
    httpRequest.onreadystatechange = callback;
    httpRequest.send(null);
  }

  render() {
    return (
      <div>
        <FindHeader />
        <CategoryList categories={categories} />
      </div>
    );
  }
}

class CategoryList extends React.Component {
  render() {
    let categoryNodes = this.props.categories.map((category) => {
      return (
        <CategoryLink name={category.name} key={category.id} categoryid={category.id} />
      );
    });

    return (
      <section className="category-list" role="main">
        <header>
          <h2>Most used resources</h2>
        </header>
        <ul className="category-items">
          {categoryNodes}
        </ul>
      </section>
    );
  }
}

class ContentPage extends React.Component {
  render() {
    return (
      <div className="find-page">
        <Navigation />
        <CategoryBox />
        <Footer />
      </div>
    );
  }
}

export default ContentPage;
