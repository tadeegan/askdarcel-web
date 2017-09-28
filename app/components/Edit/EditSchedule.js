import React, { Component } from 'react';
import { timeToTimeInputValue, stringToTime, daysOfTheWeek } from '../../utils/index';
import EditScheduleDay from './EditScheduleDay';

function buildSchedule(schedule) {
  let scheduleId = schedule ? schedule.id : null;
  let currSchedule = {};
  let finalSchedule = {};
  let currDay = '';

  let is24Hours = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

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
      currDay = curr.day;
      if (!is24Hours[currDay]) {
        // Check to see if any of the hour pairs for the day
        // indicate the resource/service is open 24 hours
        // if there is a pair only have that in the schedule obj
        if (curr.opens_at === 0 || curr.closes_at === 2359) {
          is24Hours[currDay] = true;
          currSchedule[currDay] = [{ opens_at: 0, closes_at: 2359, id: curr.id }];
        } else {
          curr.openChanged=false;
          curr.closeChanged=false;
          currSchedule[curr.day] ? currSchedule[curr.day].unshift(curr) : currSchedule[curr.day] = [curr];
        }
      }
    });
  }
  finalSchedule = Object.assign({}, tempSchedule, currSchedule);
  return finalSchedule;
}

class EditSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule_days: {},
      scheduleId: props.schedule ? props.schedule.id : null,
      scheduleDays: buildSchedule(props.schedule),
      uuid: -1,
    };

    this.getDayHours = this.getDayHours.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.addTime = this.addTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
    this.toggle24Hours = this.toggle24Hours.bind(this);
  }

  handleScheduleChange(day, index, field, value) {
    let tempDaySchedule = this.state.scheduleDays[day].map(curr => Object.assign({}, curr));
    tempDaySchedule[index][field] = stringToTime(value);
    tempDaySchedule[index][field === 'opens_at' ? 'openChanged' : 'closeChanged'] = true;
    if (!tempDaySchedule[index].id && tempDaySchedule[index].id !== null) {
      tempDaySchedule.id = null;
    }
    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, {[day]: tempDaySchedule })
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
  }

  removeTime(day, index) {
    let tempDaySchedule = this.state.scheduleDays[day].map(curr => Object.assign({}, curr));
    tempDaySchedule[index].opens_at = null;
    tempDaySchedule[index].closes_at = null;
    tempDaySchedule[index].openChanged = true;
    tempDaySchedule[index].closeChanged = true;

    if (!tempDaySchedule[index].id && tempDaySchedule[index].id !== null) {
      tempDaySchedule.id = null;
    }

    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, {[day]: tempDaySchedule });
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
  }

  addTime(day) {
    let tempDaySchedule = this.state.scheduleDays[day].map(curr => Object.assign({}, curr));
    tempDaySchedule.push({ opens_at: null, closes_at: null, scheduleId: this.state.scheduleId });
    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, { [day]: tempDaySchedule });
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
  }

  formatTime(time) {
    // FIXME: Use full times once db holds such values.
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

  toggle24Hours(day, is24Hours) {
    let tempDaySchedule = this.state.scheduleDays[day][0];

    if (is24Hours) {
      tempDaySchedule.opens_at = "0";
      tempDaySchedule.closes_at = "2359";
    } else {
      tempDaySchedule.opens_at = "0";
      tempDaySchedule.closes_at = "0";
    }

    tempDaySchedule.openChanged = true;
    tempDaySchedule.closeChanged = true;
    tempDaySchedule.scheduleId = this.state.scheduleId;

    if (!tempDaySchedule.id && tempDaySchedule.id !== null) {
      tempDaySchedule.id = null;
    }

    let tempScheduleDays = Object.assign({}, this.state.scheduleDays, {[day]: tempDaySchedule })
    this.setState({ scheduleDays: tempScheduleDays}, function() {
        this.props.handleScheduleChange(tempScheduleDays);
      });
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
        <label className='open-24-label'>24 hrs?</label>
          <ul className="edit-hours-list">
            {
              Object.keys(schedule).map((day, i) => {
                return (
                  <EditScheduleDay
                    day={day}
                    dayAbbrev={daysOfWeek[day]}
                    dayHours={schedule[day]}
                    key={i}
                    handleScheduleChange={this.handleScheduleChange}
                    toggle24Hours={this.toggle24Hours}
                    getDayHours={this.getDayHours}
                    addTime={this.addTime}
                    removeTime={this.removeTime}
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
