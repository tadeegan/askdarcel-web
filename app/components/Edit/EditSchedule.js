import React, { Component } from 'react';
import { timeToTimeInputValue, stringToTime, daysOfTheWeek } from '../../utils/index';
import EditScheduleDay from './EditScheduleDay';

function buildSchedule(schedule) {
  let scheduleId = schedule.id;
  let tempSchedule = {
    Monday: [{ opens_at: null, closes_at: null, scheduleId }],
    Tuesday: [{ opens_at: null, closes_at: null, scheduleId }],
    Wednesday: [{ opens_at: null, closes_at: null, scheduleId }],
    Thursday: [{ opens_at: null, closes_at: null, scheduleId }],
    Friday: [{ opens_at: null, closes_at: null, scheduleId }],
    Saturday: [{ opens_at: null, closes_at: null, scheduleId }],
    Sunday: [{ opens_at: null, closes_at: null, scheduleId }],
  };
  if (schedule) {
    schedule.schedule_days.forEach((curr) => {
      curr.openChanged=false;
      curr.closeChanged=false;
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
    scheduleId: props.schedule ? props.schedule.id : null,
    scheduleDays: buildSchedule(props.schedule),
    uuid: -1,
    scheduleId: this.props.schedule ? this.props.schedule.id : null,
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
  this.addTime = this.addTime.bind(this);
}

  handleScheduleChange(day, index, field, value) {
    let tempDaySchedule = this.state.scheduleDays[day].map(curr => Object.assign({}, curr));
    tempDaySchedule[index][field] = stringToTime(value);
    tempDaySchedule[index][field === 'opens_at' ? 'openChanged' : 'closeChanged'] = true;
    if (!tempDaySchedule[index].id && tempDaySchedule[index].id !== null) {
      tempDaySchedule.id = null;

    }
  }
    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, {[day]: tempDaySchedule })
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
    // Modify so that we support times that don't yet exist on BE
    // Need to pass data in the following format: {field_name: "schedule_id", field_value: "id_of_the_schedule"}
  }

  addTime(day) {
    let tempDaySchedule = this.state.scheduleDays[day].map(curr => Object.assign({}, curr));
    tempDaySchedule.push({ opens_at: null, closes_at: null, scheduleId: this.state.scheduleId });
    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, { [day]: tempDaySchedule });
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
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

  getDayHours(day, field, index) {
    let dayRecord = this.state.scheduleDays[day] && this.state.scheduleDays[day][index];
    if (!dayRecord) {
      return null;
    }
    let time = dayRecord[field];
    return timeToTimeInputValue(time, true);
  }

  render() {
    let daysOfWeek = {
      Monday: 'M',
      Tuesday: 'T',
      Wednesday: 'W',
      Thursday: 'Th',
      Friday: 'F',
      Saturday: 'S',
      Sunday: 'Su',
    } 

    let schedule = this.state.scheduleDays;
    return (
      <li key="hours" className="edit--section--list--item hours">
        <label>Hours</label>
          <ul className="edit-hours-list">
            {
              Object.keys(schedule).map((day, i) => {
                return (
                  <EditScheduleDay
                    open24Hours={this.state.open24Hours}
                    day={day}
                    dayAbbrev={daysOfWeek[day]}
                    dayHours={schedule[day]}
                    key={i}
                    handleScheduleChange={this.handleScheduleChange}
                    set24Hours={this.set24Hours}
                    getDayHours={this.getDayHours}
                    addTime={this.addTime}
                  />
                );
              })
            }
         </ul>
     </li>
    );
  }
}
export default EditSchedule;
