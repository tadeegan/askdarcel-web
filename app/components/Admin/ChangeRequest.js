import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import * as ChangeRequestTypes from './ChangeRequestTypes';
import Actions from './Actions';

class ChangeRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { existingRecord: {}, changeRequestFields: {} };
  }

  componentDidMount() {
    this.retrieveModifiedObject();
    const fields = this.props.changeRequest.field_changes;
    const tempChangeRequestFields = {};
    fields.forEach((field) => {
      tempChangeRequestFields[field.field_name] = field.field_value;
    });

    this.setState({ changeRequestFields: tempChangeRequestFields });
  }

  retrieveModifiedObject() {
    const changeRequest = this.props.changeRequest;
    const resource = changeRequest.resource;
    // "ChangeRequest" is 13 characters, so this will give us the first part of the string
    const objectType = changeRequest.type;
    let object = {};

    switch (objectType) {
      case 'ResourceChangeRequest':
        object = resource;
        break;
      case 'ServiceChangeRequest':
        object = resource.services.filter(service => service.id === changeRequest.object_id)[0];
        break;
      case 'ScheduleDayChangeRequest':
        object = resource.schedule.schedule_days
          .filter(day => day.id === changeRequest.object_id)[0];
        break;
      case 'AddressChangeRequest':
        object = resource.address;
        break;
      case 'PhoneChangeRequest':
        // console.log(resource, changeRequest);
        object = resource.phones.filter(phone => phone.id === changeRequest.object_id)[0];
        break;
      case 'NoteChangeRequest':
        const resourceNotes = resource.notes.filter(note => note.id === changeRequest.object_id);
        if (resourceNotes.length > 0) {
          object = resourceNotes[0];
        } else {
          object = this.findNoteFromServices(resource.services, changeRequest.object_id);
        }
        break;
      default:
        console.log('Unknown Change Request Type', objectType);
    }
    this.setState({ existingRecord: object });
  }

  findNoteFromServices(services, noteID) {
    for (let i = 0; i < services.length; i++) {
      const notes = services[i].notes;
      for (let j = 0; j < notes.length; j++) {
        const note = notes[j];
        if (note.id === noteID) {
          return note;
        }
      }
    }
    return false;
  }

  changeFieldValue(key, value) {
    const tempChangeRequestFields = this.state.changeRequestFields;
    tempChangeRequestFields[key] = value;
    // tempChangeRequestFields.edited = true;
    this.setState({ changeRequestFields: tempChangeRequestFields });
  }

  getExistingValueFromChangeRequest(changeRequest, fieldName, fieldValue) {
    let { resource } = changeRequest
    switch (changeRequest.type) {
      case 'ResourceChangeRequest':
        return resource[fieldName] ? resource[fieldName] : '[NEW]';
      case 'ServiceChangeRequest':
        return resource.services.find(service => service.id === changeRequest.object_id)[fieldName]
      case 'PhoneChangeRequest':
        // console.log(resource.phones)
        return 'phone';
      default:
        console.log('unknown type', changeRequest, fieldName, fieldValue)
        return 'Some Change';
    }
  }

  renderChangeRequest(changeRequest) {
    return changeRequest.field_changes.map(fieldChange => {
      let { field_name, field_value } = fieldChange
      return (
        <div key={field_name} className="change-wrapper">
          <label htmlFor={field_name}>{field_name.replace(/_/g, ' ')}</label>
          <div key={field_name} className="request-fields">
            <div className="request-entry">
              <TextareaAutosize
                value={field_value}
                onChange={e => this.changeFieldValue(field_name, e.target.value)}
                className="request-cell value"
              ></TextareaAutosize>
            </div>
            <div className="request-entry">
              <p className="request-cell value existing">
                { this.getExistingValueFromChangeRequest(changeRequest, field_name, field_value)}
              </p>
            </div>
          </div>
        </div>
      );
    });
    // const changedFields = [];
    // const existingRecord = this.state.existingRecord;
    // const changeRequestFields = this.state.changeRequestFields;

    // // TODO: existingRecord && existingRecord[field], need to fix this still
    // for (let field in changeRequestFields) {
    //   console.log(field, existingRecord, changeRequestFields)
    //   changedFields.push(
    //     <div key={field} className="change-wrapper">
    //       <label htmlFor={field}>{field.replace(/_/g, ' ')}</label>
    //       <div key={field} className="request-fields">
    //         <div className="request-entry">
    //           <TextareaAutosize
    //             value={changeRequestFields[field]}
    //             onChange={e => this.changeFieldValue(field, e.target.value)}
    //             className="request-cell value">
    //           </TextareaAutosize>
    //         </div>
    //         <div className="request-entry">
    //           <p className="request-cell value existing">{existingRecord[field] || '{ NEW }'}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    // return changedFields;
  }

  render() {
    return (
      <div className="change-log">
        <Actions
          id={this.props.changeRequest.id}
          changeRequestFields={this.state.changeRequestFields}
          actionHandler={this.props.actionHandler}
          approveAction={ChangeRequestTypes.APPROVE}
          rejectAction={ChangeRequestTypes.DELETE}
        />
        {this.renderChangeRequest(this.props.changeRequest)}
      </div>
    );
  }
}

ChangeRequest.propTypes = {
  actionHandler: PropTypes.func.isRequired,
  changeRequest: PropTypes.object.isRequired,
};

export default ChangeRequest;
