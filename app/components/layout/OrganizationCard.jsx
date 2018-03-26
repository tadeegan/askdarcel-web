import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import StreetViewImage from 'components/maps/StreetViewImage';
import RelativeOpeningTime from 'components/listing/RelativeOpeningTime';

class OrganizationCard extends React.Component {
  calculateShortDescription() {
    const { org } = this.props;
    return org.short_description || org.long_description.split('\n')[0];
  }

  render() {
    const { org, org: { id, address, schedule, name } } = this.props;

    return (
      <Link to={{ pathname: '/resource', query: { id } }} className="card">
        <StreetViewImage address={address} />
        <header className="content">
          <h3>{ name }</h3>
          <h4>
            <span>{ address.address_1 }</span>
            {/* TODO Walking distance */}
            <RelativeOpeningTime schedule={schedule} />
          </h4>
          {/* TODO Add Rating */}
          {/* TODO HAP Certification */}
          <p>{ this.calculateShortDescription(org) }</p>
        </header>
      </Link>
    );
  }
}

OrganizationCard.propTypes = {
  org: PropTypes.object.isRequired,
};

export default OrganizationCard;
