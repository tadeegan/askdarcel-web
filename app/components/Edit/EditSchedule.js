import React, { Component } from 'react';
import { timeToTimeInputValue, stringToTime, daysOfTheWeek } from '../../utils/index';

class EditSchedule extends Component {
constructor(props) {
  super(props);

  let scheduleMap = {};
  props.schedule && props.schedule.schedule_days.forEach(function(day) {
    scheduleMap[day.day] = day;
  });

  this.state = {
    scheduleMap: scheduleMap,
    schedule_days: {},
    uuid: -1,
    open24Hours: {
      "Monday": false,
      "Tuesday": false,
      "Wednesday": false,
      "Thursday": false,
      "Friday": false,
      "Saturday": false,
      "Sunday": false,
    }
  };

  this.getDayHours = this.getDayHours.bind(this);
  this.handleScheduleChange = this.handleScheduleChange.bind(this);
  this.set24Hours = this.set24Hours.bind(this);
  this.buildTimeInput = this.buildTimeInput.bind(this);
}

  handleScheduleChange(e) {
    let currScheduleMap = this.state.scheduleMap;
    let field = e.target.dataset.field;
    let day = e.target.dataset.key;
    let value = e.target.value;
    let serverDay = currScheduleMap[day];
    let formattedTime = stringToTime(value);
    let newUUID = this.state.uuid - 1;

    if (formattedTime !== serverDay[field]) {
      let schedule_days = this.state.schedule_days;
      let newDay = schedule_days[serverDay.id] ? schedule_days[serverDay.id] : {};
      newDay[field] = formattedTime;
      newDay.day = day;
      let key = serverDay.id ? serverDay.id : newUUID;
      schedule_days[key] = newDay;
      this.setState({ schedule_days: schedule_days, uuid: newUUID }, function() {
        this.props.handleScheduleChange(schedule_days);
      });
    }
  }

  set24Hours(e) {
    let day = e.target.dataset.key;
    let open24Hours = Object.assign({}, this.state.open24Hours);
    if (this.state.open24Hours[day] === true) {
      this.handleScheduleChange(e);
    } else {
      let currScheduleMap = this.state.scheduleMap;
      let openTime = 0;
      let closeTime = 2359;
      let value = e.target.value;
      let serverDay = currScheduleMap[day];
      let formattedTime = stringToTime(value);
      let newUUID = this.state.uuid - 1;

  
      let schedule_days = this.state.schedule_days;
      let newDay = schedule_days[serverDay.id] ? schedule_days[serverDay.id] : {};
      newDay["opens_at"] = openTime;
      newDay["closes_at"] = closeTime;
      newDay.day = day;
      let key = serverDay.id ? serverDay.id : newUUID;
      schedule_days[key] = newDay;
      this.setState({ schedule_days: schedule_days, uuid: newUUID }, function() {
        this.props.handleScheduleChange(schedule_days);
      });
    }

    open24Hours[day] = !open24Hours[day];
    this.setState({ open24Hours });
  }

  buildTimeInput(day) {
    return (
      this.state.open24Hours[day] ?
        <div>
          <p className="open24">Open 24 Hours</p> <input type="checkbox" data-key={day} data-field="opens_at" onChange={this.set24Hours} />
        </div>
        :
        <div>
          <input type="time" defaultValue={this.getDayHours(day, "opens_at")} data-key={day} data-field="opens_at" onChange={this.handleScheduleChange}/>
          <input type="time" defaultValue={this.getDayHours(day, "closes_at")} data-key={day} data-field="closes_at" onChange={this.handleScheduleChange}/>
          <input type="checkbox" data-key={day} data-field="opens_at" onChange={this.set24Hours} />
        </div>
      )
  }

  formatTime(time) {
    //FIXME: Use full times once db holds such values.
    return time.substring(0, 2);
  }

  getDayHours(day, field) {
    let dayRecord = this.state.scheduleMap[day];
    if (!dayRecord) {
      return null;
    }

    let time = dayRecord[field];
    return timeToTimeInputValue(time, true);
  }

  render() {
    // TODO: Need to make it so that when 24 hours is untoggled, the time will revert back to the default/old time
    return (
      <li key="hours" className="edit--section--list--item hours">
        <label>Hours</label>
        <label className="hour-label">24 Hours?</label>
          <ul className="edit-hours-list">
            <li>
              <p>M</p>
              {
                this.buildTimeInput("Monday")
              }
            </li>
            <li>
              <p>T</p>
              {
                this.buildTimeInput("Tuesday")
              }
            </li>
            <li>
              <p>W</p>
              {
                this.buildTimeInput("Wednesday")
              }
            </li>
            <li>
              <p>Th</p>
              {
                this.buildTimeInput("Thursday")
              }
            </li>
            <li>
              <p>F</p>
              {
                this.buildTimeInput("Friday")
              }
            </li>
            <li>
              <p>S</p>
              {
                this.buildTimeInput("Saturday")
              }
            </li>
            <li>
              <p>Su</p>
              {
                this.buildTimeInput("Sunday")
              }
            </li>
          </ul>
     </li>
    );
  }
}

export default EditSchedule;
