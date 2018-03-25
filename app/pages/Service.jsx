import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getService } from 'actions/serviceActions';

import Loader from 'components/Loader';
import OrganizationCard from 'components/layout/OrganizationCard';
import ServiceCard from 'components/layout/ServiceCard';
import { Link } from 'react-router';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { get } from 'utils/DataService';

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
    return (
      !service
        ? <Loader />
        : <div>
          <h1>{ service.name }</h1>
          <p>Also known as: </p>
          <div>
            Part of [Program Name] program, offered by { service.resource.name }
          </div>
          <OrganizationCard org={service.resource} />
          <ServiceCard service={service} />
          <h2>About this Service</h2>
          <p>{service.long_description}</p>
          <h2>Service Details</h2>
          {/* <DataTable>
            <TableBody>
              {this.state.aboutRows.map(row => (
                <TableRow key={row.key}>
                  <TableColumn>{row.key}</TableColumn>
                  {<TableColumn>{service[row.key]}</TableColumn>}
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
          <h2>Contact Info</h2>
          <DataTable>
            <TableBody>
              <TableRow>
                <TableColumn>Website</TableColumn>
                {<TableColumn>{service[row.key]}</TableColumn>}
              </TableRow>
            </TableBody>
          </DataTable> */}
          <h2>Location and Hours</h2>
          <pre>{ JSON.stringify(this.props.activeService, null, 2)}</pre>
        </div>
    );
  }
}

export default connect(
  state => ({ ...state.services }),
  dispatch => bindActionCreators({ getService }, dispatch),
)(ServicePage);
