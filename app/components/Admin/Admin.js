import React from 'react';
import Loader from '../Loader';
import ChangeRequests from './ChangeRequests';
import * as dataService from '../../utils/DataService';
import * as changeRequestConstants from './ChangeRequestTypes';
import { getAuthRequestHeaders } from '../../utils/index';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            change_requests: [],
            loaded: false
        };

        this.actionHandler = this.actionHandler.bind(this);
        this.getChangeRequests = this.getChangeRequests.bind(this);
        this.removeChangeRequest = this.removeChangeRequest.bind(this);
    }

    componentDidMount() {
        this.getChangeRequests();
    }

    getChangeRequests() {
      dataService.get('/api/change_requests', getAuthRequestHeaders()).then((json) => {
        let changeRequestsMap = {};
        let resources = {};
        json.change_requests.forEach((changeRequest) => {
          changeRequestsMap[changeRequest.id] = changeRequest;
          let resource = changeRequest.resource;
          if(resource) {
              resources[resource.id] = resource;
          }
        });

        this.setState({
          change_requests: json.change_requests,
          loaded: true
        });
      });
    }

    actionHandler(changeRequestID, action) {
      if(action === changeRequestConstants.APPROVE) {
        dataService.post(
            '/api/change_requests/' + changeRequestID + '/approve',
            getAuthRequestHeaders()
        ).then((response) => {
            if(response.ok) {
                this.removeChangeRequest(changeRequestID);
            } else {
                console.log("Error while trying to approve change request.");
            }
        });
      } else if(action === changeRequestConstants.DELETE) {
        dataService.post(
            '/api/change_requests/' + changeRequestID + '/reject',
            getAuthRequestHeaders()
        ).then((response) => {
            if(response.ok) {
                this.removeChangeRequest(changeRequestID);
            } else {
                console.log("Error while trying to reject change request.");
            }
        });
      }
    }

    removeChangeRequest(changeRequestID) {
        let changeRequests = this.state.change_requests;
        this.setState({ change_requests: changeRequests.filter(changeRequest => changeRequest.id != changeRequestID) });
    }

    render() {
        return (
            !this.state.loaded ? <Loader /> :
            <div className="admin">
              <ChangeRequests changeRequests={this.state.change_requests} actionHandler={this.actionHandler}/>
            </div>
        )
    }
}

export default Admin;
