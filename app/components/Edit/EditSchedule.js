import React, { Component } from 'react';
import { timeToTimeInputValue, stringToTime, daysOfTheWeek } from '../../utils/index';
import EditScheduleDay from './EditScheduleDay';

function buildSchedule(schedule) {
  let tempSchedule = {
    Monday: [{ opens_at: null, closes_at: null }],
    Tuesday: [{ opens_at: null, closes_at: null }],
    Wednesday: [{ opens_at: null, closes_at: null }],
    Thursday: [{ opens_at: null, closes_at: null }],
    Friday: [{ opens_at: null, closes_at: null }],
    Saturday: [{ opens_at: null, closes_at: null }],
    Sunday: [{ opens_at: null, closes_at: null }],
  };
  if (schedule) {
    schedule.schedule_days.forEach((curr) => {
      tempSchedule[curr.day].unshift(curr);
    });

    let tempDaySched = [];
    Object.keys(tempSchedule).forEach((day) => {
      tempDaySched = tempSchedule[day];
      if (tempDaySched.length > 1) {
        tempDaySched.pop();
      }
    });
  }
  return tempSchedule;
}

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
    scheduleDays: buildSchedule(props.schedule),
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
}

  handleScheduleChange(e) {
    let currScheduleMap = this.state.scheduleMap;
    let field = e.target.dataset.field;
    let day = e.target.dataset.key;
    let value = e.target.value;
    let serverDay = currScheduleMap[day];
    let formattedTime = stringToTime(value);
    let newUUID = this.state.uuid - 1;


    // Modify so that we support times that don't yet exist on BE
    // Need to pass data in the following format: {field_name: "schedule_id", field_value: "id_of_the_schedule"}

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
    let daysOfWeek = [ 
      {day: "Monday", abbrev: "M"}, 
      {day: "Tuesday", abbrev: "T"}, 
      {day: "Wednesday", abbrev: "W"}, 
      {day: "Thursday", abbrev: "Th"}, 
      {day: "Friday", abbrev: "F"}, 
      {day: "Saturday", abbrev: "S"}, 
      {day: "Sunday", abbrev: "Su"}
    ] 
    // TODO: Need to make it so that when 24 hours is untoggled, the time will revert back to the default/old time
    return (
      <li key="hours" className="edit--section--list--item hours">
        <label>Hours</label>
        <label className="hour-label">24 Hours?</label>
          <ul className="edit-hours-list">
            {
              daysOfWeek.map( ( dayObj,i ) => {
              return (
                <EditScheduleDay open24Hours={this.state.open24Hours} 
                  day={dayObj.day} 
                  dayAbbrev={dayObj.abbrev} 
                  key={i}
                  handleScheduleChange={this.handleScheduleChange} 
                  set24Hours={this.set24Hours} 
                  getDayHours={this.getDayHours} />
                )
              })
            }
          </ul>
     </li>
    );
  }
}
export default EditSchedule;
