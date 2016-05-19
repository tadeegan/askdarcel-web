import React, { Component } from 'react';
import Header from './Header';
import CategoryPage from './CategoryPage';
import ResourcesTable from './Resources/ResourcesTable';

const emptyFunction = () => {};

class App extends Component {

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        {this.props.children}
      </div>
    ) : this.props.children;
  }

};

export default App;