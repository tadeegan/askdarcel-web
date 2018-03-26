import React from 'react';

const ResourceEntry = ({ hit }) => {
  return (
    <li className="results-table-entry resource-entry">
      <header>
        <div className="entry-details">
          <h4 className="entry-headline">{hit.name}</h4>
          <div className="entry-subhead">
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
          <li className="action-button">Directions</li>
        </ul>
      </div>
    </li>
  );
};


export default ResourceEntry;
