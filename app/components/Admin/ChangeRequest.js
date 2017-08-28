import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import * as ChangeRequestTypes from './ChangeRequestTypes';
import Actions from './Actions';
import utils from './helpers/utils';

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

  renderChangeRequestPretext(changeRequest) {
    let { type, resource, field_changes } = changeRequest;

    switch (changeRequest.type) {
      // Render the current address in full, and what the new address would be.
      case 'AddressChangeRequest':
        const addressKeys = ['address_1', 'address_2', 'address_3', 'address_4', 'city', 'state', 'country', 'postal_code']
        const generateAddressString = key => `${resource.address[key] || '-'}\n`;
        const currentAddress = addressKeys.map(generateAddressString);
        const newAddress = addressKeys.map((key) => {
          const valueIfChanged = field_changes.find(change => change.field_name === key);
          if (valueIfChanged) {
            return `${valueIfChanged.field_value}\n`;
          }
          return generateAddressString(key);
        });

        return (
          <div key="change-request-helper" className="change-request-helper">
            <div className="compare-half">
              Current Address
              <p className="change-existing address-box">
                { currentAddress }
              </p>
            </div>
            <div className="compare-half">
              Suggested Address
              <p className="change-existing address-box">
                { newAddress }
              </p>
            </div>
          </div>
        );

      case 'PhoneChangeRequest':
      case 'ResourceChangeRequest':
      case 'ServiceChangeRequest':
      case 'NoteChangeRequest':
      case 'ScheduleDayChangeRequest':
        return '';

      default:
        console.log('unknown pretext type, rendering nothing', changeRequest);
        return false;
    }
  }

  renderChangeRequest(changeRequest) {
    switch (changeRequest.type) {
      case 'ScheduleDayChangeRequest':
        let schedule = utils.getScheduleChanges(changeRequest);
        console.log(schedule);
        return (
          <div key="address-change" className="change-wrapper">
            <div className="compare-third">
              <label htmlFor="day">Day</label>
              <div className="request-fields">
                <div className="request-entry">
                  <TextareaAutosize
                    value={schedule.day}
                    onChange={e => this.changeFieldValue(field_name, e.target.value)}
                    className="request-cell value"/>
                </div>
              </div>
            </div>
            <div className="compare-third">
              <label htmlFor="start">Opens</label>
              <div className="request-fields">
                <div className="request-entry">
                  <TextareaAutosize
                    value={schedule.opens_at}
                    onChange={e => this.changeFieldValue(field_name, e.target.value)}
                    className="request-cell value"/>
                </div>
                {
                  <p className="change-existing">{ schedule.opened_at || 'NEW' }</p>
                }
              </div>
            </div>
            <div className="compare-third">
              <label htmlFor="end">Closes</label>
              <div className="request-fields">
                <div className="request-entry">
                  <TextareaAutosize
                    value={schedule.closes_at}
                    onChange={e => this.changeFieldValue(field_name, e.target.value)}
                    className="request-cell value"/>
                </div>
                {
                  <p className="change-existing">{ schedule.closed_at || 'NEW' }</p>
                }
              </div>
            </div>
          </div>
        );

      default:
        return changeRequest.field_changes.map(fieldChange => {
          let { field_name, field_value } = fieldChange;
          let existingValue = this.getExistingValueFromChangeRequest(changeRequest, field_name, field_value)
          return (
            <div key={field_name} className="change-wrapper">
              <label htmlFor={field_name}>
                {field_name.replace(/_/g, ' ')}
                { existingValue ? '' : (<sub>NEW</sub>) }
              </label>
              <div className="request-fields">
                <div className="request-entry">
                  <TextareaAutosize
                    value={field_value}
                    onChange={e => this.changeFieldValue(field_name, e.target.value)}
                    className="request-cell value" />
                </div>
                {
                  existingValue
                  ? (
                    <p className="change-existing">
                      { this.getExistingValueFromChangeRequest(changeRequest, field_name, field_value)}
                    </p>
                  )
                  : ''
                }
              </div>
            </div>
          );
        });
    }
    // const pretext = this.getChangeRequestPretext(changeRequest);

    // // Prepend the CR with any useful text specific to this change Request
    // if (pretext) {
    //   changeRequestMarkup.push(pretext);
    // }

    // changeRequestMarkup.push(changeRequestFields);

    // return changeRequestMarkup;
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
        { this.renderChangeRequestPretext(this.props.changeRequest) }
        { this.renderChangeRequest(this.props.changeRequest) }
      </div>
    );
  }
}

ChangeRequest.propTypes = {
  actionHandler: PropTypes.func.isRequired,
  changeRequest: PropTypes.object.isRequired,
};

export default ChangeRequest;
