import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getService } from 'actions/serviceActions';

import { Link } from 'react-router';
import { Datatable, Loader } from 'components/ui';
import { OrganizationCard, ServiceCard } from 'components/layout';
import { ActionSidebar, TableOfContactInfo, TableOfOpeningTimes } from 'components/listing';
import { MapOfLocations } from 'components/maps';

class ServicePage extends React.Component {
  componentWillMount() {
    const { routeParams: { service } } = this.props;
    this.props.getService(service);
  }

  render() {
    const { activeService: service } = this.props;
    if (!service) { return (<Loader />); }

    const { resource, program, schedule } = service;

    return (
      <div className="listing-container">
        <article className="listing" id="service">
          <div className="listing--main">
            <div className="listing--main--left">
              <header>
                <h1>{ service.name }</h1>
                { service.alsoNamed ? <p>Also Known As</p> : null}
                <p>
                  A service
                  {/* TODO Implement rendering/popover when programs exist */}
                  { program ? <span>in the {program.name} program,</span> : null }
                  <span> offered by <Link to={`/resource?id=${resource.id}`}>{ resource.name }</Link></span>
                </p>
              </header>

              <section>
                <h2>About This Service</h2>
                <p>{ service.long_description }</p>
              </section>

              <section>
                <h2>Service Details</h2>
                <Datatable />
              </section>

              <section>
                <h2>Contact Info</h2>
                <TableOfContactInfo item={service} />
              </section>

              <section>
                <h2>Locations and Hours</h2>
                <MapOfLocations locations={[{
                  address: resource.address,
                  name: service.name,
                  schedule,
                }]}
                />
                <TableOfOpeningTimes schedule={schedule} />
              </section>

              { resource.services.length > 1 ? <section>
                <h2>Other Services at this Location</h2>
                {/* TODO Exclude the current service from this list */}
                { resource.services.map(srv => (<ServiceCard service={srv} />)) }
              </section> : null}

              <section>
                {/* <h2>Similar Services Near You</h2> */}
                {/* TODO Need an API to get similar services, maybe same category for now? */}
              </section>

              <section>
                <OrganizationCard org={service.resource} />
                <pre>{ JSON.stringify(this.props.activeService, null, 4)}</pre>
              </section>

            </div>
            <div className="listing--aside">
              <ActionSidebar actions={[
                // TODO Edit should add service ID header
                { name: 'Edit', icon: 'edit', to: `/resource/edit?resourceid=${resource.id}` }, // TODO Update with path to /resource/:id
                { name: 'Print', icon: 'print', handler: () => { window.print(); } },
                // { name: 'Share', icon: 'share' }, // TODO Integrate with mobile share, how to handle shares
                // { name: 'Save', icon: 'save' }, TODO We have no save mechanism yet
                // TODO Directions to address, not lat/long, is much better UX
                { name: 'Directions', icon: 'directions', link: `http://google.com/maps/dir/?api=1&destination=${resource.address.latitude},${resource.address.longitude}` },
              ]}
              />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

ServicePage.propTypes = {
  routeParams: PropTypes.object.isRequired,
};

export default connect(
  state => ({ ...state.services }),
  dispatch => bindActionCreators({ getService }, dispatch),
)(ServicePage);
