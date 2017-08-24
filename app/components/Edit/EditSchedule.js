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
    }

    handleScheduleChange(e) {
        let currScheduleMap = this.state.scheduleMap;
        let field = e.target.dataset.field;
        let day = e.target.dataset.key;
        let value = e.target.value;
        let serverDay = currScheduleMap[day];
        let formattedTime = stringToTime(value);
        let newUUID = this.state.uuid-1;

        if(formattedTime !== serverDay[field]) {
            let schedule_days = this.state.schedule_days;
            let newDay = schedule_days[serverDay.id] ? schedule_days[serverDay.id] : {};
            newDay[field] = formattedTime;
            newDay.day = day;
            let key = serverDay.id ? serverDay.id : newUUID;
            schedule_days[key] = newDay;
            this.setState({schedule_days: schedule_days, uuid: newUUID}, function() {
                this.props.handleScheduleChange(schedule_days);
            });
        }
    }

    set24Hours(e) {
        let currScheduleMap = this.state.scheduleMap;
        let openTime = 0;
        let closeTime = 2359;
        let day = e.target.dataset.key;
        let open24Hours = Object.assign({}, this.state.open24Hours);
        open24Hours[day] = true;
        this.setState({ open24Hours });
        let value = e.target.value;
        let serverDay = currScheduleMap[day];
        let formattedTime = stringToTime(value);
        let newUUID = this.state.uuid-1;

        let schedule_days = this.state.schedule_days;
        let newDay = schedule_days[serverDay.id] ? schedule_days[serverDay.id] : {};
        newDay["opens_at"] = openTime;
        newDay["closes_at"] = closeTime;
        newDay.day = day;
        let key = serverDay.id ? serverDay.id : newUUID;
        schedule_days[key] = newDay;
        this.setState({schedule_days: schedule_days, uuid: newUUID}, function() {
            this.props.handleScheduleChange(schedule_days);
        });
    }

    formatTime(time) {
        //FIXME: Use full times once db holds such values.
        return time.substring(0, 2);
    }

    getDayHours(day, field) {
        let dayRecord = this.state.scheduleMap[day];
        if(!dayRecord) {
            return null;
        }

        let time = dayRecord[field];
        return timeToTimeInputValue(time, true);
    }

    render() {
        return (
            <li key="hours" className="edit--section--list--item hours">
                <label>Hours</label>
                <ul className="edit-hours-list">
                    <li>
                        <p>M</p>
                        {
                            this.state.open24Hours["Monday"] ? <p>Open 24 Hours</p> :
                                <div>
                                    <input type="time" defaultValue={this.getDayHours("Monday", "opens_at")} data-key="Monday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                                    <input type="time" defaultValue={this.getDayHours("Monday", "closes_at")} data-key="Monday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                                    <input type="checkbox" data-key="Monday" data-field="opens_at" onChange={this.set24Hours} />
                                </div>
                        }
                    </li>
                    <li>
                        <p>T</p>
                        <input type="time" defaultValue={this.getDayHours("Tuesday", "opens_at")} data-key="Tuesday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Tuesday", "closes_at")} data-key="Tuesday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                    <li>
                        <p>W</p>
                        <input type="time" defaultValue={this.getDayHours("Wednesday", "opens_at")} data-key="Wednesday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Wednesday", "closes_at")} data-key="Wednesday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                    <li>
                        <p>Th</p>
                        <input type="time" defaultValue={this.getDayHours("Thursday", "opens_at")} data-key="Thursday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Thursday", "closes_at")} data-key="Thursday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                    <li>
                        <p>F</p>
                        <input type="time" defaultValue={this.getDayHours("Friday", "opens_at")} data-key="Friday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Friday", "closes_at")} data-key="Friday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                    <li>
                        <p>S</p>
                        <input type="time" defaultValue={this.getDayHours("Saturday", "opens_at")} data-key="Saturday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Saturday", "closes_at")} data-key="Saturday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                    <li>
                        <p>Su</p>
                        <input type="time" defaultValue={this.getDayHours("Sunday", "opens_at")} data-key="Sunday" data-field="opens_at" onChange={this.handleScheduleChange}/>
                        <input type="time" defaultValue={this.getDayHours("Sunday", "closes_at")} data-key="Sunday" data-field="closes_at" onChange={this.handleScheduleChange}/>
                    </li>
                </ul>
            </li>
        );
    }
}

export default EditSchedule;
