import React, { Component } from 'react';

class EditScheduleDay extends Component {
	constructor(props) {
  	super(props);

  	this.state = {
  		hours: []
  		// hourElement: 
  	}
  }

  buildTimeInput(day, index) {
    return (
      this.props.open24Hours[day] ?
        <div>
          <p className="open24">Open 24 Hours</p> <input type="checkbox" data-key={day} data-field="opens_at" onChange={this.props.set24Hours} />
        </div>
        :
        <div>
          <input type="time" defaultValue={this.props.getDayHours(day, "opens_at", index)} data-key={day} data-field="opens_at" onChange={(e) => this.props.handleScheduleChange(day, index, "opens_at", e.target.value)}/>
          <input type="time" defaultValue={this.props.getDayHours(day, "closes_at", index)} data-key={day} data-field="closes_at" onChange={(e) => this.props.handleScheduleChange(day, index, "closes_at", e.target.value)}/>
        </div>
      )
  }

  render(){
    let day = this.props.day;
    return (
  	 <div>
        {
          this.props.dayHours.map((curr, i) => {
            return (
              <li>
                <p>{this.props.dayAbbrev}</p>
                {
                  this.buildTimeInput(day, i)
                }
              </li>
            )
          })
        }
        <div><button onClick={() => this.props.addTime(day)}>+</button></div>
      </div>
    );
  }
}

export default EditScheduleDay;