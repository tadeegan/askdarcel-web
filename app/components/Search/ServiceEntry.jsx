import React from 'react';

const ServiceEntry = ({hit}) => {
  return (
    <li className="results-table-entry service-entry">
      <header>
        <div className="entry-details">
          <h4 className="entry-headline">{hit.name}</h4>
          <div className="entry-subhead">
            <p className="entry-affiliated-resource">a service offered by St. Vincent de Paul Society</p>
            <p>1175 Howard Street • 15 Minute Walk • Open until 1:00 am</p>
          </div>
        </div>
      </header>
      <div className="line-break"></div>
      <div className="entry-additional-info">

      </div>
      <div className="entry-action-buttons">
        <ul className="action-buttons">
          <li className="action-button">Details</li>
          <li className="action-button">
            <a href={`https://maps.google.com?saddr=Current+Location&daddr=${hit._geoloc.lat},${hit._geoloc.lng}&dirflg=w`}
              target="_blank"
              rel="noopener noreferrer"
              className="org--aside--content--button directions-button">
                Directions
            </a>
          </li>
        </ul>
      </div>

    </li>
  );
}


export default ServiceEntry;
