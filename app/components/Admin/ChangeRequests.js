import React from 'react';
import ChangeRequest from './ChangeRequest';
import Actions from './Actions';

var ChangeRequests = (props) => {
    return (
        <div className="change-requests">
            {renderChangeRequests(props)}
        </div>
    );
};

function renderChangeRequests(props) {
    let resourceToChangeRequests = {};
    let resourceObjects = {};
    let changeRequestWrappers = [];
    props.changeRequests.forEach((changeRequest) => {
        let resourceID = changeRequest.resource.id;

        if(!resourceToChangeRequests.hasOwnProperty(resourceID)) {
            resourceToChangeRequests[resourceID] = [];
        }

        resourceToChangeRequests[resourceID].push(changeRequest);
        resourceObjects[resourceID] = changeRequest.resource;
    });

    for(var resourceID in resourceToChangeRequests) {
        if(resourceToChangeRequests.hasOwnProperty(resourceID)) {
            changeRequestWrappers.push(
                <div key={resourceID} className="group-container">
                    <h1>{resourceObjects[resourceID].name}</h1>
                    {renderIndividualRequests(resourceToChangeRequests[resourceID], props)}
                </div>
            );
        }
    }

    return changeRequestWrappers;
}

function renderIndividualRequests(changeRequests, props) {
    let requestsToRender = [];
    changeRequests.forEach((changeRequest) => {
        requestsToRender.push(
            <div>
                <p>{changeRequest.type}</p>
                <div className="request-container" key={changeRequest.id}>
                    <ChangeRequest changeRequest={changeRequest} />
                    <Actions changeRequestID={changeRequest.id} actionHandler={props.actionHandler}/>
                </div>
            </div>
        );
    });

    return requestsToRender;
}

export default ChangeRequests;
