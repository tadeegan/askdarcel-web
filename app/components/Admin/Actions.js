import React from 'react';
import * as ChangeRequestTypes from './ChangeRequestTypes';

var Actions = (props) => {
    let changeRequestID = props.changeRequestID;
    return (
        <div className="actions request-cell">
            <i className="material-icons" onClick={() => props.actionHandler(changeRequestID, ChangeRequestTypes.DELETE)}>delete</i>
            <i className="material-icons" onClick={() => props.actionHandler(changeRequestID, ChangeRequestTypes.APPROVE)}>done</i>
        </div>
    );
};

export default Actions;