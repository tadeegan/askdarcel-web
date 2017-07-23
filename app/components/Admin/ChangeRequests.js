// import * as ChangeRequestTypes from './ChangeRequestTypes';
// import Actions from './Actions';
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash/fp/object';
import ChangeRequest from './ChangeRequest';
import * as ChangeRequestTypes from './ChangeRequestTypes';
import ProposedService from './ProposedService';

class ChangeRequests extends React.Component {

  static renderIndividualRequests(changeRequests, actionHandler) {
    if (!changeRequests) { return; }
    const resourceInfoToRender = [];
    const requestsToRender = [];

    changeRequests.forEach((changeRequest) => {
      switch (changeRequest.type) {
        case 'ResourceChangeRequest':
        case 'PhoneChangeRequest':
          resourceInfoToRender.push(
            <div key={`cr${changeRequest.id}`}>
              <span>{ ChangeRequests.renderIndividualChangeRequest(changeRequest, actionHandler) }</span>
            </div>,
          );
          break;
        case 'ServiceChangeRequest':
          console.log(changeRequest)
          requestsToRender.push(
            <div key={`cr${changeRequest.id}`} className="service-wrapper">
              { ChangeRequests.renderIndividualChangeRequest(changeRequest, actionHandler) }
            </div>,
          );
          break;
        default:
          console.log('rendering unknown', changeRequest);
          // TODO: Pretty sure there are no other types for now
      }
    });

    if (requestsToRender.length) {
      requestsToRender.unshift(
        <span key="title">
          <hr />
          <h3>Services</h3>
        </span>
      );
    }

    return resourceInfoToRender.concat(requestsToRender);
  }

  static renderIndividualChangeRequest(changeRequest, actionHandler) {
    return (
      <div className="request-container">
        <ChangeRequest changeRequest={changeRequest} actionHandler={actionHandler} />
      </div>
    );
  }

  static renderProposedServices(services, actionHandler) {
    if (!services) { return; }
    return services.map(service => (
      <div key={`svc${service.id}`}>
        <p>Proposed Service</p>
        <div className="request-container">
          <ProposedService service={service} actionHandler={actionHandler} />
        </div>
      </div>
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      resourceToCollapsed: {},
    };
    this.props.changeRequests.forEach((changeRequest) => {
      const resourceID = changeRequest.resource.id;
      this.state.resourceToCollapsed[resourceID] = true;
    });
    this.props.services.forEach((service) => {
      const resourceID = service.resource.id;
      this.state.resourceToCollapsed[resourceID] = true;
    });
  }

  toggleCollapsed(resourceID) {
    let resourceToCollapsed = _.extend({}, this.state.resourceToCollapsed);
    resourceToCollapsed[resourceID] ^= true;
    this.setState({
      resourceToCollapsed,
    });
  }

  renderChangeRequests(changeRequests, services, actionHandler) {
    const resourceToChangeRequests = {};
    const resourceObjects = {};
    const changeRequestWrappers = [];
    const resourceToServices = {};

    // Arrange change requests by resource ID
    changeRequests.forEach((changeRequest) => {
      const resourceID = changeRequest.resource.id;

      if (resourceToChangeRequests[resourceID] === undefined) {
        resourceToChangeRequests[resourceID] = [];
      }

      resourceToChangeRequests[resourceID].push(changeRequest);
      resourceObjects[resourceID] = changeRequest.resource;
    });

    // Arrange services by resource ID
    services.forEach((service) => {
      // console.log(service)
      const resourceID = service.resource.id;
      if (resourceToServices[resourceID] === undefined) {
        resourceToServices[resourceID] = [];
      }
      resourceToServices[resourceID].push(service);
      resourceObjects[resourceID] = service.resource;
    });

    // Render each change request
    Object.keys(resourceObjects).forEach((resourceID) => {
      const collapsed = this.state.resourceToCollapsed[resourceID] ? 'collapsed' : '';
      changeRequestWrappers.push(
        <div key={resourceID} className={`group-container ${collapsed}`}>
          <h2 onClick={() => this.toggleCollapsed(resourceID)}>
            {resourceObjects[resourceID].name}
            <span className={'sub'}>#{resourceID}</span>
            <span className={`material-icons expander ${collapsed} right`}>expand_less</span>
          </h2>
          <div className={`group-content ${collapsed}`}>
            <div className="btn-group right">
              <button
                className="btn"
                onClick={() => this.props.bulkActionHandler(
                    ChangeRequestTypes.APPROVE,
                    resourceToChangeRequests[resourceID])}
              >
                Accept All
              </button>
            </div>
            {
              ChangeRequests
                .renderIndividualRequests(resourceToChangeRequests[resourceID], actionHandler)
            }
            {
              ChangeRequests
                .renderProposedServices(resourceToServices[resourceID], actionHandler)
            }
          </div>
        </div>
      );
    });

    // If there are no requests, render a happy message
    if (!changeRequestWrappers.length) {
      changeRequestWrappers.push(
        <p className="message">
          Hurrah, it looks like you&#39;ve handled all the outstanding change requests!
        </p>
      );
    }

    return changeRequestWrappers;
  }

  render() {
    return (
      <div className="change-requests">
        <h1 className="page-title">
          {`Change Requests (${this.props.changeRequests.length})`}
        </h1>
        {this.renderChangeRequests(
          this.props.changeRequests,
          this.props.services,
          this.props.actionHandler,
        )}
      </div>
    );
  }
}

ChangeRequests.propTypes = {
  changeRequests: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  actionHandler: PropTypes.func.isRequired,
  bulkActionHandler: PropTypes.func.isRequired,
};

export default ChangeRequests;
