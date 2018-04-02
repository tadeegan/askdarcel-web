import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getService } from 'actions/serviceActions';
import { get } from 'utils/DataService';

import OrganizationCard from 'components/layout/OrganizationCard';
import ServiceCard from 'components/layout/ServiceCard';
import { ListPageSidebar, TableOfContactInfo, TableOfOpeningTimes } from 'components/listing';
import { Datatable, Loader } from 'components/ui';
// import ContactInfoTable from 'components/listing/ContactInfoTable';
import MapOfLocations from 'components/maps/MapOfLocations';
import { Link } from 'react-router';
// import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

class ServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      hoverResource: false,
      aboutRows: [
        { key: 'howtoapply' },
        { key: 'whocanuse' },
        { key: 'requireddocuments' },
        { key: 'fees' },
        { key: 'waitlist' },
        { key: 'accessibility' },
        { key: 'languages' },
        { key: 'fundingsources' },
        { key: 'notes' },
      ],
    };
  }

  componentWillMount() {
    const { routeParams } = this.props;
    this.props.getService(routeParams.service);
  }

  async componentDidMount() {
    const { routeParams } = this.props;
    // TODO Once service endpoint exists, load it directly
    const { resource } = await get(`/api/resources/${routeParams.service}`);
    const service = resource.services[0];
    console.log(service, resource);
    this.setState({ service, resource });
  }

  render() {
    const { activeService: service } = this.props
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
                <MapOfLocations locations={[{ address: resource.address, name: service.name, schedule }]} />
                <TableOfOpeningTimes schedule={schedule} />
              </section>

              <section>
                <h2>Other Services at this Location</h2>
              </section>

              <section>
                <h2>Similar Services Near You</h2>
              </section>

              <section>
                <OrganizationCard org={service.resource} />
                <ServiceCard service={service} />
                <pre>{ JSON.stringify(this.props.activeService, null, 4)}</pre>
              </section>

            </div>
            <div className="listing--aside">
              <ListPageSidebar />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

// ServicePage.propTypes = {
//   activeService: PropTypes.object.isRequired,
// };

export default connect(
  state => ({ ...state.services }),
  dispatch => bindActionCreators({ getService }, dispatch),
)(ServicePage);
