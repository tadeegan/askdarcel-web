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
    let changeRequests = [];
    props.changeRequests.forEach((changeRequest) => {
        changeRequests.push(
            <div key={changeRequest.id} className="group-container">
                <h1>Resource Name</h1>
                <div className="request-container" key={changeRequest.id}>
                    <ChangeRequest changeRequest={changeRequest} />
                    <Actions changeRequestID={changeRequest.id} actionHandler={props.actionHandler}/>
                </div>
            </div>
        );
    });

    return changeRequests;
}

export default ChangeRequests;
