import React, { Component } from 'react';

class ResourceMap extends Component {
  constructor(props) {
    super(props);
    this.state = { userLocation: null };
  }

  componentDidMount() {
    // console.log(this.props);
    let latLng = new google.maps.LatLng(this.props.lat, this.props.long);
    let map = new google.maps.Map(this.refs.map_canvas, {
      center: latLng,
      zoom: 13
    });
    let marker = new google.maps.Marker({
      position: latLng,
      map,
      title: this.props.name
    });
  }

  render() {
    return (<div ref="map_canvas" className="map_canvas"></div>);
  }
}

export default ResourceMap;