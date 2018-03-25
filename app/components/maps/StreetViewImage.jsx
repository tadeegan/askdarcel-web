import React from 'react';
import PropTypes from 'prop-types';

class StreetViewImage extends React.Component {
  buildImageUrl() {
    const { address } = this.props;

    if (address && address.latitude && address.longitude) {
      let url = 'https://maps.googleapis.com/maps/api/streetview?size=640x640';
      url += `&location=${address.latitude},${address.longitude}`;
      url += '&fov=90&heading=235&pitch=10';

      if (CONFIG.GOOGLE_API_KEY) { url += `&key=${CONFIG.GOOGLE_API_KEY}`; }

      return url;
    } else {
      // TODO Allow configurable defaults or icons from org type
      return 'http://lorempixel.com/200/200/city/';
    }
  }

  render() {
    return (
      <img
        className="streetview"
        alt="resource"
        src={this.buildImageUrl()}
      />
    );
  }
}

StreetViewImage.propTypes = {
  address: PropTypes.object.isRequired,
};

export default StreetViewImage;
