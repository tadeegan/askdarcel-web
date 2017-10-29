// import * as ChangeRequestTypes from './ChangeRequestTypes';
// import Actions from './Actions';
import React from 'react';
import PropTypes from 'prop-types';
import * as DataService from '../../utils/DataService';
// import * as _ from 'lodash/fp/object';
import ChangeRequest from './ChangeRequest';
// import * as ChangeRequestTypes from './ChangeRequestTypes';
import ProposedService from './ProposedService';
import { getAuthRequestHeaders } from '../../utils/index';

class ChangeRequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeResource: undefined,
      parsedChanges: {},
    };
    this.loadAllChanges();
  }

  /**
   * Loads and parses all the change requests and pending services
   * @return {[type]} [description]
   */
  loadAllChanges() {
    Promise.all([
      DataService.get('/api/change_requests', getAuthRequestHeaders()),
      DataService.get('/api/services/pending', getAuthRequestHeaders()),
    ]).then((d) => {
      const parsedChanges = Object.assign(
        { loaded: true, resources: {} },
        { changeRequests: d[0].change_requests },
        { count: d[0].change_requests.length },
        d[1],
      );

      // Track invidivual Resources
      const ensureResourceExists = (resource) => {
        if (parsedChanges.resources[resource.id] === undefined) {
          // console.log('attaching resource', resource);
          resource._changeRequests = [];
          resource._proposedServices = [];
          resource._collapsed = true;
          parsedChanges.resources[resource.id] = resource;
        }
      };

      // Attach change requests to this resource
      parsedChanges.changeRequests.forEach((cr) => {
        ensureResourceExists(cr.resource);
        parsedChanges.resources[cr.resource.id]._changeRequests.push(cr);
      });

      // Attach proposed services
      parsedChanges.services.forEach((s) => {
        ensureResourceExists(s.resource);
        parsedChanges.resources[s.resource.id]._proposedServices.push(s);
      });

      this.setState(parsedChanges);
      console.log(parsedChanges);
    });
  }

  setActiveResource(resource) {
    console.log('setting active resource', resource);
    this.setState({
      activeResource: resource,
    });
  }

  /**
   * Renders the wrapper for an individual resource
   * with associated changeRequests
   * @param  {Object} resource    A passed in resource
   * @return {JSX}                A full accordian with all the relevant changes
   */
  renderIndividualResourceListing(resource) {
    return (
      <div
        key={resource.id}
        className="results-table-entry resource-title"
        onClick={() => this.setActiveResource(resource)}
        role="link"
        tabIndex="-1"
      >
        <header>
          <h4>{ resource.name }</h4>
        </header>
      </div>
    );
  }

  /**
   * Renders the complete array of changes for a resource, including
   * changeRequests and proposed services, in the appropriate order
   * @param  {Object} resource    A single resource already parsed with
   *                              relevant changeRequests etc attached
   * @return {JSX}                All changeRequests, serviceChanges and
   *                              proposedServices in order.
   */
  renderResourceChangeRequests(resource) {
    const services = {};
    const resourceChanges = [];
    const serviceChanges = [];
    const proposedServices = [];

    resource._changeRequests.forEach((changeRequest) => {
      switch (changeRequest.type) {
        case 'ServiceChangeRequest':
          serviceChanges.push(
            <ChangeRequest
              key={changeRequest.id}
              changeRequest={changeRequest}
            />,
          );

          // if (services[changeRequest.object_id] === undefined) {
          //   services[changeRequest.object_id] = [];
          // }
          // services[changeRequest.object_id].push(changeRequest);
          // console.log(changeRequest)
          break;

        // case 'AddressChangeRequest':
        // case 'NoteChangeRequest':
        // case 'PhoneChangeRequest':
        // case 'ResourceChangeRequest':
        // case 'ScheduleDayChangeRequest':
        //   sections.resourceChanges.push(
        //     <div key={`change-request-${changeRequest.id}`} className="request-container resource-change-wrapper">
        //       <ChangeRequest changeRequest={changeRequest} actionHandler={this.props.actionHandler} />
        //     </div>
        //   );
        //   break;

        default:
          resourceChanges.push(
            <ChangeRequest
              key={changeRequest.id}
              changeRequest={changeRequest}
            />,
          );
      }
    });

    resource._proposedServices.forEach(service => {
      proposedServices.push(
        <ProposedService
          key={service.id}
          service={service}
          actionHandler={this.props.actionHandler}
        />,
      );
    });

    return (
      <div>
        <div className="titlebox">
          <h2>{resource.name}</h2>
          <ul>
            <li>Changes: ({ resourceChanges.length })</li>
            <li>Service Changes: ({ serviceChanges.length })</li>
            <li>Proposed Changes: ({ proposedServices.length })</li>
          </ul>
        </div>
        <div>
          { resourceChanges}
        </div>
        <div>
          <h3>Services</h3>
          { serviceChanges }
          { proposedServices }
        </div>
      </div>
    );
  }

  /**
   * render a full list of changeRequests
   * @return {JSX} A full list of changeRequests seperated by resource
   */
  render() {
    return (
      <div className="admin change-requests results">
        <div className="results-table">
          <h1 className="page-title">
            Change Requests ({ this.state.parsedChanges.count })
          </h1>
          {
            this.state.resources
              ? (
                Object.keys(this.state.resources).map((resourceID) => {
                  return (
                    <div key={`resource-${resourceID}`}>
                      { this.renderIndividualResourceListing(this.state.resources[resourceID]) }
                    </div>
                  );
                })
              )

              : (
                <p className="message">
                  Hurrah, it looks like you&#39;ve handled all the outstanding change requests!
                </p>
              )
          }
        </div>

        <div className={`results-table details ${this.state.activeResource ? '' : 'inactive'}`}>
          {
            !this.state.activeResource
              ? (<div>Choose a resource</div>)
              : (<div>{ this.renderResourceChangeRequests(this.state.activeResource) }</div>)
          }
        </div>
      </div>
    );
  }
}

ChangeRequestsPage.propTypes = {
  // changeRequests: PropTypes.array.isRequired,
  // services: PropTypes.array.isRequired,
  // actionHandler: PropTypes.func.isRequired,
  // bulkActionHandler: PropTypes.func.isRequired,
};

export default ChangeRequestsPage;
