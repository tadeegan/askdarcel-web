import React from 'react';
// import PropTypes from 'prop-types';

class ListPageSidebar extends React.Component {
  render() {
    return (
      <ul>
        <li>Edit</li>
        <li>Print</li>
        <li>Share</li>
        <li>Save</li>
        <li>Directions</li>
      </ul>
    );
  }
}

ListPageSidebar.propTypes = {
  // schedule: PropTypes.object.isRequired,
};

export default ListPageSidebar;
