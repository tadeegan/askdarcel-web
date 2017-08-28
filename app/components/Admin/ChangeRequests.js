// import * as ChangeRequestTypes from './ChangeRequestTypes';
// import Actions from './Actions';
import React from 'react';
import PropTypes from 'prop-types';
// import * as _ from 'lodash/fp/object';
import ChangeRequest from './ChangeRequest';
// import * as ChangeRequestTypes from './ChangeRequestTypes';
import ProposedService from './ProposedService';

class ChangeRequests extends React.Component {

  // static renderIndividualRequests(changeRequests, actionHandler) {
  //   if (!changeRequests) { return; }
  //   const resourceInfoToRender = [];
  //   const requestsToRender = [];

  //   changeRequests.forEach((changeRequest) => {
  //     switch (changeRequest.type) {
  //       case 'ResourceChangeRequest':
  //       case 'PhoneChangeRequest':
  //         resourceInfoToRender.push(
  //           <div key={`cr${changeRequest.id}`}>
  //             <span>{ ChangeRequests.renderIndividualChangeRequest(changeRequest, actionHandler) }</span>
  //           </div>,
  //         );
  //         break;
  //       case 'ServiceChangeRequest':
  //         // console.log(changeRequest)
  //         requestsToRender.push(
  //           <div key={`cr${changeRequest.id}`} className="service-wrapper">
  //             { ChangeRequests.renderIndividualChangeRequest(changeRequest, actionHandler) }
  //           </div>,
  //         );
  //         break;
  //       default:
  //         console.log('rendering unknown', changeRequest);
  //         // TODO: Pretty sure there are no other types for now
  //     }
  //   });

  //   if (requestsToRender.length) {
  //     requestsToRender.unshift(
  //       <span key="title">
  //         <h3>Service Changes Requests</h3>
  //         <hr />
  //       </span>
  //     );
  //   }

  //   return resourceInfoToRender.concat(requestsToRender);
  // }

  // static renderIndividualChangeRequest(changeRequest, actionHandler) {
  //   return (
  //     <div className="request-container">
  //       <ChangeRequest changeRequest={changeRequest} actionHandler={actionHandler} />
  //     </div>
  //   );
  // }

  // static renderProposedServices(services, actionHandler) {
  //   if (!services) { return; }
  //   // console.log('services', services);
  //   return services.map((service, i) => (
  //     <div key={`svc${service.id}`}>
  //       <h3>New Service {i+1}:</h3>
  //       <hr />
  //       <div className="request-container">
  //         <ProposedService service={service} actionHandler={actionHandler} />
  //       </div>
  //     </div>
  //   ));
  // }

  // renderChangeRequests(changeRequests, services, actionHandler) {
  //   // const resourceToChangeRequests = {};
  //   // const resourceObjects = {};
  //   // const changeRequestWrappers = [];
  //   // const resourceToServices = {};

  //   let changeRequestWrappers = Object.keys(this.state.resourceObjects).map((resourceID) => {
  //     return (
  //       <div key={`resource-${resourceID}`}>
  //         { this.renderIndividualResourceListing(this.state.resourceObjects[resourceID]) }
  //       </div>
  //     );
  //   });

  //   // Render each change request
  //   // Object.keys(this.state.resourceObjects).forEach((resourceID) => {
  //   //   changeRequestWrappers.push(
  //   //     <div key={`resource-${resourceID}`}>
  //   //       { this.renderIndividualResourceListing(this.state.resourceObjects[resourceID]) }
  //   //     </div>
  //   //   );

  //   //   // const collapsed = this.state.resourceToCollapsed[resourceID] ? '' : 'collapsed';
  //   //   // // TODO Switch back to closed by default
  //   //   // changeRequestWrappers.push(
  //   //   //   <div key={resourceID} className={`group-container ${collapsed}`}>
  //   //   //     <h2 onClick={() => this.toggleCollapsed(resourceID)}>
  //   //   //       {resourceObjects[resourceID].name}
  //   //   //       <span className={'sub'}>#{resourceID}</span>
  //   //   //       <span className={`material-icons expander ${collapsed} right`}>expand_less</span>
  //   //   //     </h2>
  //   //   //     <div className={`group-content ${collapsed}`}>
  //   //   //       {
  //   //   //         ChangeRequests
  //   //   //           .renderIndividualRequests(resourceToChangeRequests[resourceID], actionHandler)
  //   //   //       }
  //   //   //       {
  //   //   //         ChangeRequests
  //   //   //           .renderProposedServices(resourceToServices[resourceID], actionHandler)
  //   //   //       }
  //   //   //       <div className="btn-group right">
  //   //   //         <button
  //   //   //           className="btn"
  //   //   //           onClick={() => this.props.bulkActionHandler(
  //   //   //               ChangeRequestTypes.APPROVE,
  //   //   //               resourceToChangeRequests[resourceID])}
  //   //   //         >
  //   //   //           Accept All
  //   //   //         </button>
  //   //   //       </div>
  //   //   //     </div>
  //   //   //   </div>
  //   //   // );
  //   // });

  //   // If there are no requests, render a happy message
  //   // if (!changeRequestWrappers.length) {
  //   //   changeRequestWrappers.push(
  //   //     <p className="message">
  //   //       Hurrah, it looks like you&#39;ve handled all the outstanding change requests!
  //   //     </p>
  //   //   );
  //   // }

  //   return changeRequestWrappers;
  // }

  constructor(props) {
    super(props);
    this.state = {
      resourceObjects: {},
      resourceToCollapsed: {},
    };

    const ensureResourceExists = resource => {
      if (this.state.resourceObjects[resource.id] === undefined) {
        console.log('attaching resource', resource);
        resource._changeRequests = [];
        resource._suggestedServices = [];
        resource._collapsed = true;
        this.state.resourceObjects[resource.id] = resource;
      }
    };

    // Arrange change requests by resource ID
    this.props.changeRequests.forEach((changeRequest) => {
      ensureResourceExists(changeRequest.resource);
      this.state.resourceObjects[changeRequest.resource.id]._changeRequests.push(changeRequest);
    });

    // Arrange services by resource ID
    this.props.services.forEach((service) => {
      ensureResourceExists(service.resource);
      this.state.resourceObjects[service.resource.id]._suggestedServices.push(service);
    });
  }

  /**
   * Turn Toggle the collapsed state of an individual resource
   * @param  {Object} resource   A resource object
   */
  toggleCollapsedState(resource) {
    const { resourceObjects } = this.state;
    resourceObjects[resource.id]._collapsed = !resource._collapsed;
    this.setState({
      resourceObjects,
    });
  }

  /**
   * If there are no serviceChanges or proposedServices, return an empty wrapper
   * otherwise wrap them up in a title and beautification div
   * @param  {JSX} serviceChanges      An array of serviceChanges for a given resource
   * @param  {JSX} proposedServices    An array of proposedServices for a given resource
   * @param  {Number} resourceID       An integer object_id for the resource
   * @return {JSX}                     The serviceChanges and proposedServices wrapped
   *                                   in beautification
   */
  renderResourceServiceWrapper(serviceChanges, proposedServices, resourceID) {
    if (serviceChanges.length === 0 && proposedServices.length === 0) {
      return (
        <div key={`resource-${resourceID}-services`} className="service-wrapper"></div>
      );
    }

    return (
      <div key={`resource-${resourceID}-services`} className="service-wrapper">
        <h3>Services</h3>
        <hr />
        { serviceChanges }
        { proposedServices }
      </div>
    );
    // const hasServices = sections.serviceChanges.length || sections.proposedServices.length
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
    const sections = {
      resourceChanges: [],
      serviceChanges: [],
      proposedServices: [],
    };

    resource._changeRequests.forEach((changeRequest) => {
      switch (changeRequest.type) {
        case 'AddressChangeRequest':
        case 'NoteChangeRequest':
        case 'PhoneChangeRequest':
        case 'ResourceChangeRequest':
        case 'ScheduleDayChangeRequest':
          sections.resourceChanges.push(
            <div key={`change-request-${changeRequest.id}`} className="request-container resource-change-wrapper">
              <ChangeRequest changeRequest={changeRequest} actionHandler={this.props.actionHandler} />
            </div>
          );
          break;

        case 'ServiceChangeRequest':
          if (services[changeRequest.object_id] === undefined) {
            services[changeRequest.object_id] = [];
          }
          services[changeRequest.object_id].push(changeRequest);
          // console.log(changeRequest)
          break;

        default:
          console.log('unknown change request type', changeRequest.type, changeRequest);
      }
    });

    Object.keys(services).forEach(serviceID => {
      const serviceChanges = services[serviceID].map(changeRequest => {
        return (
          <ChangeRequest key={`change-request-${changeRequest.id}`} changeRequest={changeRequest} actionHandler={this.props.actionHandler} />
        );
      });
      sections.serviceChanges.push(
        <div key={`service-${serviceID}-changes`} className="request-container service-change-wrapper">
          <h4>Service { serviceID }</h4>
          { serviceChanges }
        </div>
      );
    });

    resource._suggestedServices.forEach(service => {
      sections.proposedServices.push(
        <div key={`service-${service.id}`} className="request-container proposed-service-wrapper">
          <h4>New Service {service.id}:</h4>
          <ProposedService service={service} actionHandler={this.props.actionHandler} />
        </div>
      );
    });

    return ([
      ...sections.resourceChanges,
      this.renderResourceServiceWrapper(sections.serviceChanges, sections.proposedServices, resource.id),
    ]);
  }

/**
 * Renders the wrapper for an individual resource
 * with associated changeRequests
 * @param  {Object} resource    A passed in resource
 * @return {JSX}                A full accordian with all the relevant changes
 */
  renderIndividualResourceListing(resource) {
    return (
      <div key={resource.id} className={`group-container ${ resource._collapsed ? 'collapsed' : '' }`}>
        <h2 onClick={() => this.toggleCollapsedState(resource)}>
          { resource.name }
          <span className={'sub'}>#{resource.id}</span>
          <span className={`material-icons expander ${resource._collapsed ? 'collapsed' : ''} right`}>expand_less</span>
        </h2>
        <div className={`group-content ${resource._collapsed ? 'collapsed' : ''}`}>
          { this.renderResourceChangeRequests(resource) }
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
      <div className="change-requests">
        <h1 className="page-title">
          {`Change Requests (${this.props.changeRequests.length})`}
        </h1>
        {
          this.state.resourceObjects
            ? (
              Object.keys(this.state.resourceObjects).map((resourceID) => {
                return (
                  <div key={`resource-${resourceID}`}>
                    { this.renderIndividualResourceListing(this.state.resourceObjects[resourceID]) }
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
