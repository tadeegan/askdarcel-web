import React from 'react';
import Loader from 'components/Loader';
import { Link } from 'react-router';
import { DataTable, TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables'
// import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

import { get } from 'utils/DataService';

class ServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
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

  async componentDidMount() {
    const { routeParams } = this.props;
    // TODO Once service endpoint exists, load it directly
    const { resource } = await get(`/api/resources/${routeParams.service}`);
    const service = resource.services[0];
    console.log(service, resource);
    this.setState({ service, resource });
  }

  render() {
    const { service, resource } = this.state
    return (!service ? <Loader /> :
      <div>
        <h1>{ service.name }</h1>
        <p>Also known as: </p>
        <p>
          Part of [Program Name] program, offered by <Link>{ resource.name }</Link>
        </p>
        <h2>About this Service</h2>
        <p>{service.long_description}</p>
        <h2>Service Details</h2>
        <DataTable>
          <TableBody>
            {this.state.aboutRows.map(row => (
              <TableRow key={row.key}>
                <TableColumn>{row.key}</TableColumn>
                {/* <TableColumn>{service[row.key]}</TableColumn> */}
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
        <h2>Contact Info</h2>
        <DataTable>
          <TableBody>
            <TableRow>
              <TableColumn>Website</TableColumn>
              {/* <TableColumn>{service[row.key]}</TableColumn> */}
            </TableRow>
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

export default ServicePage;
