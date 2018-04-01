import React from 'react';
import { connectHits } from 'react-instantsearch/connectors';
import { fitBounds } from 'google-map-react/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function HitsMap({ hits }) {
  if (!hits.length) {
    return null;
  }

  const markers = hits.map(hit => (
      <CustomMarker lat={hit._geoloc.lat} lng={hit._geoloc.lng} key={hit.objectID} />
  ));

  console.log('markers:', markers)
  console.log('hits:', hits)

  const options = {
    minZoomOverride: true,
    minZoom: 2,
  };

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
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

const SearchMap = connectHits(HitsMap);


export default SearchMap;
