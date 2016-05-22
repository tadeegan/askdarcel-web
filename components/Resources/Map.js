import React, { Component } from 'react';

class Gmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: {}
    };
  }

  getLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount() {
    this.getLocation(position => {
      var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
      var map = new google.maps.Map(this.refs.map_canvas, {
        center: myLatLng,
        zoom: 15
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    });
  }

  render() {
    return (
      <div className="Map">
        <div ref="map_canvas" className="map_canvas"></div>
      </div>
    )
  }
}

export default Gmap;