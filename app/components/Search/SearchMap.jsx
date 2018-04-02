import React from 'react';
import { connectHits } from 'react-instantsearch/connectors';
import { fitBounds } from 'google-map-react/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';


function HitsMap({ hits, userLocation }) {
  if (!hits.length) {
    return null;
  }

  const markers = hits.map(hit => (
      <CustomMarker lat={hit._geoloc.lat} lng={hit._geoloc.lng} key={hit.objectID} />
  ));

  const options = {
    minZoomOverride: true,
    minZoom: 2,
  };

  markers.push(<UserLocationMarker lat={userLocation.lat} lng={userLocation.lng} />);

  return (
    <div className="results-map">
      <div className="map-wrapper">
        <GoogleMap
          bootstrapURLKeys={{
            key: CONFIG.GOOGLE_API_KEY,
          }}
          center={{lat: 37.7749, lng: -122.4194}}
          defaultZoom={14}
          options={createMapOptions}
        >
        {markers}
        </GoogleMap>
      </div>
    </div>
  );
}

function UserLocationMarker() {
  return (
    <svg width="40" height="40">
      <circle cx="20" cy="20" r="8" fill="none" stroke="#007ac7" strokeWidth="10" />
    </svg>
  );
}

function CustomMarker() {
  /*  eslint-disable max-len */
  return (
    <svg width="30" height="50" viewBox="0 0 102 60" className="marker">
      <g fill="none" fillRule="evenodd">
        <g
          transform="translate(-60, 0)"
          stroke="#8962B2"
          id="pin"
          viewBox="0 0 100 100"
        >
          <path
            d="M157.39 34.315c0 18.546-33.825 83.958-33.825 83.958S89.74 52.86 89.74 34.315C89.74 15.768 104.885.73 123.565.73c18.68 0 33.825 15.038 33.825 33.585z"
            strokeWidth="5.53"
            fill="#E6D2FC"
          />
          <path
            d="M123.565 49.13c-8.008 0-14.496-6.498-14.496-14.52 0-8.017 6.487-14.52 14.495-14.52s14.496 6.503 14.496 14.52c0 8.022-6.487 14.52-14.495 14.52z"
            strokeWidth="2.765"
            fill="#FFF"
          />
        </g>
      </g>
    </svg>
  );
  /*  eslint-enable max-len */
}

function createMapOptions(maps) {

  return {
    zoomControlOptions: {
      position: maps.ControlPosition.LEFT_TOP,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
    },
    mapTypeControl: true,
  };
}

const SearchMap = connectHits(HitsMap);

function mapStateToProps(state) {
  return {
    userLocation: state.user.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchMap);
