import React from 'react';
import Loader from '../Loader';
import ChangeRequests from './ChangeRequests';
import * as dataService from '../../utils/DataService';
import * as changeRequestConstants from './ChangeRequestTypes';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            change_requests: [],
            auth: {}
        };

        this.actionHandler = this.actionHandler.bind(this);
        this.auth = this.auth.bind(this);
        this.getChangeRequests = this.getChangeRequests.bind(this);
    }

    componentDidMount() {
        this.getChangeRequests();
    }

    auth(callback) {
      dataService.post('/api/admin/auth/sign_in', {
        "email":"dev-admin@sheltertech.org",
        "password":"dev-test-01"
      }).then((resp) => {
        let headers = resp.headers;
        let auth = {
          "access-token": headers.get("access-token"),
          "client": headers.get("client"),
          "uid": headers.get("uid")
        };
        this.setState({ auth: auth }, () => {
          callback();
        });
      });
    }

    getChangeRequests() {
        let that = this;
        this.auth(function() {
          dataService.get('/api/change_requests', that.state.auth).then((json) => {
            let changeRequestsMap = {};
            let resources = {};
            json.change_requests.forEach((changeRequest) => {
              changeRequestsMap[changeRequest.id] = changeRequest;
              let resource = changeRequest.resource;
              if(resource) {
                  resources[resource.id] = resource;
              }
            });

            that.setState({
              change_requests: json.change_requests,
              changeRequestsMap: changeRequestsMap,
              resources: resources
            });
          });
        });
    }

    actionHandler(changeRequestID, action) {
      if(action === changeRequestConstants.APPROVE) {
        console.log(changeRequestID + ' ' + "Approveeeeed");
        dataService.post(
            '/api/change_requests/' + changeRequestID + '/approve'
        ).then((response) => {
            if(response.ok) {
                this.getChangeRequests();
            } else {
                console.log("Error while trying to approve change request.");
            }
        });
      } else if(action === changeRequestConstants.DELETE) {
        console.log(changeRequestID + ' ' + "BALEETED");
        dataService.post(
            '/api/change_requests/' + changeRequestID + '/reject'
        ).then((response) => {
            if(response.ok) {
                this.getChangeRequests();
            } else {
                console.log("Error while trying to reject change request.");
            }
        });
      }
    }

    render() {
        return (
            this.state.change_requests.length == 0 ? <Loader /> :
            <div className="admin">
              <ChangeRequests changeRequests={this.state.change_requests} resources={this.state.resources} actionHandler={this.actionHandler}/>
            </div>
        )
    }
}

export default Admin;
