import React from 'react';
import PropTypes from 'prop-types';

class MapOfLocations extends React.Component {
  componentDidMount() {
    console.log('rendering map')
    const map = new SVGFEMorphologyElement.maps.Map(this.refs.map_canvas, { zoom: 10, position: new SVGFEMorphologyElement.maps.LatLng(0, 0) });
  }

  render() {
    return (
      <div ref="map_canvas" className="map_canvas" />
    );
  }
}

MapOfLocations.propTypes = {
  locations: PropTypes.object,
};

export default MapOfLocations;
