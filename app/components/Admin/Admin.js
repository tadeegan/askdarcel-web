import React from 'react';
import Loader from '../Loader';
import ChangeRequests from './ChangeRequests';
import * as dataService from '../../utils/DataService';
import * as changeRequestConstants from './ChangeRequestTypes';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            change_requests: []
        };

        this.actionHandler = this.actionHandler.bind(this);
    }

    componentDidMount() {
        // dataService.get();
        let respBody = {
          "change_requests": [
            {
              "id": 2,
              "status": "pending",
              "type": "ResourceChangeRequest",
              "object_id": 1,
              "field_changes": [
                {
                  "field_name": "website",
                  "field_value": "www.monkeyface.com"
                },
                {
                  "field_name": "long_description",
                  "field_value": "long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description long_description "
                }
              ]
            },
            {
              "id": 3,
              "status": "pending",
              "type": "ResourceChangeRequest",
              "object_id": 1,
              "field_changes": [
                {
                  "field_name": "short_description",
                  "field_value": "COOOOOORRAAALLL"
                }
              ]
            },
            {
              "id": 4,
              "status": "pending",
              "type": "ServiceChangeRequest",
              "object_id": 1,
              "field_changes": [
                {
                  "field_name": "eligibility",
                  "field_value": "flippity floppity"
                }
              ]
            }
          ]
      };

      let changeRequestsMap = {};
      respBody.change_requests.forEach((changeRequest) => {
        changeRequestsMap[changeRequest.id] = changeRequest;
      });

      this.setState({
        change_requests: respBody.change_requests,
        changeRequestsMap: changeRequestsMap
      });
    }

    actionHandler(changeRequestID, action) {
      if(action === changeRequestConstants.APPROVE) {
        console.log(changeRequestID + ' ' + "Approveeeeed");
      } else if(action === changeRequestConstants.DELETE) {
        console.log(changeRequestID + ' ' + "BALEETED");
      }
        //handle action
    }

    render() {
        return (
            this.state.change_requests.length == 0 ? <Loader /> :
            <div className="admin">
              <ChangeRequests changeRequests={this.state.change_requests} actionHandler={this.actionHandler}/>
            </div>
        )
    }
}

export default Admin;
