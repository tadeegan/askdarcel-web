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
    let offset = this.props.markers.center ? 2 : 1;
    markers.forEach((marker, index) => {
      var latLang = new google.maps.LatLng(marker[0], marker[1]);
      new google.maps.Marker({
        position: latLang,
        map: map,
        label: (index + offset)+'',
        title: 'Resource ' + (index + offset)
      });
    })
  }

  componentDidMount() {
    let map = new google.maps.Map(this.refs.map_canvas, {
      center: this.props.markers.user,
      zoom: 13
    });

    new google.maps.Marker({
      position: this.props.markers.user,
      map: map,
      title: 'Your position'
    });

    if(this.props.markers.center) {
      let latLang = new google.maps.LatLng(this.props.markers.center[0], this.props.markers.center[1]);
      map.setCenter(latLang);
      new google.maps.Marker({
        position: latLang,
        map: map,
        label: '1',
        title: 'Resource 1'
      });
    }

    this.populateMarkers(this.props.markers.additional, map);

  }

  render() {
    return (
      <div ref="map_canvas" className="map_canvas"></div>
    )
  }
}

export default Gmap;