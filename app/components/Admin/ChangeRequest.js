import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import * as ChangeRequestTypes from './ChangeRequestTypes';
import Actions from './Actions';
import utils from './helpers/utils';
import * as dataService from '../../utils/DataService';
import { getAuthRequestHeaders } from '../../utils/index';

class ChangeRequest extends React.Component {
  constructor(props) {
    super(props);
    // this.props.changeRequest.field_changes.forEach(ch)
    this.state = {
      existingRecord: {},
      changeRequestFields: {},
    };
  }

  changeFieldValue(key, value) {
    const tempChangeRequestFields = this.state.changeRequestFields;
    tempChangeRequestFields[key] = value;
    // tempChangeRequestFields.edited = true;
    this.setState({ changeRequestFields: Object.assign({}, ) });
  }

  getExistingValueFromChangeRequest(changeRequest, fieldName, fieldValue) {
    let { resource } = changeRequest;
    switch (changeRequest.type) {
      case 'ResourceChangeRequest':
      case 'AddressChangeRequest':
      case 'PhoneChangeRequest':
      case 'NoteChangeRequest':
        return resource[fieldName] ? resource[fieldName] : false;
      case 'ScheduleDayChangeRequest':
        return 'date change';
      case 'ServiceChangeRequest':
        return resource.services.find(service => service.id === changeRequest.object_id)[fieldName];
      default:
        console.log('unknown type', changeRequest, fieldName, fieldValue);
        return '<Some Change>';
    }
  }

  approve() {
    let details = {}
    this.props.changeRequest.field_changes.forEach(change => {
      details[change.field_name] = change.field_value
    });
    const body = Object.assign({}, details, this.state.changeRequestFields)
    console.log('approving', this.props.changeRequest.id, body);
    // return
    return dataService.post(
      `/api/change_requests/${this.props.changeRequest.id}/approve`,
      { change_request: body },
      getAuthRequestHeaders(),
    ).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  }

  reject() {
    console.log('rejecting', this.props.changeRequest.id, this.state.changeRequestFields);
  }

  renderFieldChange(change) {
    const fieldName = change.field_name;
    const fieldValue = change.field_value;
    const existingValue = this.getExistingValueFromChangeRequest(
      this.props.changeRequest,
      fieldName,
      fieldValue,
    );

    switch (this.props.changeRequest.type) {
      default:
        return (
          <div key={fieldName} className="change-wrapper">
            <label htmlFor={fieldName}>
              { fieldName.replace(/_/g, ' ') }
              { existingValue ? '' : (<sub>NEW</sub>) }
            </label>
            <div className="request-fields">
              <div className="request-entry">
                <TextareaAutosize
                  value={fieldValue}
                  onChange={e => this.changeFieldValue(fieldName, e.target.value)}
                  className="request-cell value"
                />
              </div>
              {
                existingValue
                ? (
                  <p className="change-existing">
                    {
                      this.getExistingValueFromChangeRequest(
                        this.props.changeRequest,
                        fieldName,
                        fieldValue,
                      )
                    }
                  </p>
                )
                : ''
              }
            </div>
          </div>
        );
        // return (<div>{change.field_name}: {change.field_value}</div>);
    }
  }

  render() {
    console.log(this.props.changeRequest);
    return (
      <div className="change-request-wrapper">
        <div className="actions request-cell">
          <i
            className="material-icons"
            onClick={() => this.approve()}
          >done</i>
          <i
            className="material-icons"
            onClick={() => this.reject()}
          >delete</i>
        </div>
        <div className="changes">
          {
            this.props.changeRequest.field_changes.map(f => (
              <div key={f.field_name}>
                {this.renderFieldChange(f)}
              </div>
            ))
          }
        </div>
        { /* this.renderChangeRequest(this.props.changeRequest) */ }
        { /* this.renderChangeRequestPretext(this.props.changeRequest) */ }
        { /* this.renderChangeRequest(this.props.changeRequest) */ }
      </div>
    );
  }
}

ChangeRequest.propTypes = {
  // actionHandler: PropTypes.func.isRequired,
  changeRequest: PropTypes.object.isRequired,
};

export default ChangeRequest;
