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

  populateMarkers(markers, map) {
    markers.forEach((marker, index) => {
      let number = index + 2;
      var latLang = new google.maps.LatLng(marker[0], marker[1]);
      new google.maps.Marker({
        position: latLang,
        map: map,
        label: number+'',
        title: 'Resource ' + number
      });
    })
  }

  componentDidMount() {
    
    var latLang = new google.maps.LatLng(this.props.markers.center[0], this.props.markers.center[1]);
    var map = new google.maps.Map(this.refs.map_canvas, {
      center: latLang,
      zoom: 13
    });

    new google.maps.Marker({
        position: latLang,
        map: map,
        label: '1',
        title: 'Resource 1'
      });

    this.populateMarkers(this.props.markers.additional, map);

    this.getLocation(position => {
      var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
      
      var userLocation = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your location'
      });
    });

  }

  render() {
    return (
      <div ref="map_canvas" className="map_canvas"></div>
    )
  }
}

export default Gmap;