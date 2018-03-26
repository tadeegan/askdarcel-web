import React from 'react';
// import PropTypes from 'prop-types';

class RelativeOpeningTime extends React.Component {
  render() {
    console.log('rendering opening times', this.props);
    return (<span>Closed Now</span>);
  }
}

RelativeOpeningTime.propTypes = {
  // schedule: PropTypes.object.isRequired,
};

export default RelativeOpeningTime;
