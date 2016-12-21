import React from 'react';
import * as dataService from '../../utils/DataService';

class ChangeRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { existingRecord: {} };
        this.renderChangeRequest = this.renderChangeRequest.bind(this);
    }

    componentDidMount() {
        this.retrieveModifiedObject();
    }

    retrieveModifiedObject() {
        let changeRequest = this.props.changeRequest;
        //"ChangeRequest" is 13 characters, so this will give us the first part of the string
        let objectType = changeRequest.type.slice(0, -13).toLowerCase();
        
        //TODO: hook up data
        // dataService.get('/api/' + objectType + '/' + changeRequest.object_id).then(function(data) {
        //     this.setState({ existingRecord: data });
        // });
    }

    renderChangeRequest() {
        let changedFields = [];
        let existingRecord = this.state.existingRecord;

        this.props.changeRequest.field_changes.forEach((fieldChange) => {
            let fieldName = fieldChange.field_name;
            let fieldValue = fieldChange.field_value;

            //FIXME
            existingRecord[fieldName] = "Description";

            changedFields.push(
                <div key={fieldName} className="request-fields">
                    <div className="request-entry">
                        <p className="request-cell name existing">{fieldName}</p>
                        <p className="request-cell value existing">{existingRecord[fieldName]}</p>
                    </div>
                    <div className="request-entry">
                        <p className="request-cell name">{fieldName}</p>
                        <p className="request-cell value">{fieldValue}</p>
                    </div>
                </div>
            );
        });

        return changedFields;
    }

    render() {
        return (
            <div className="change-log">
                {this.renderChangeRequest(this.props.changeRequest)}
            </div>
        );
    }
}

export default ChangeRequest;