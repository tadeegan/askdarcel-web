import React, { Component } from 'react';

class EditScheduleDay extends Component {
	constructor(props) {
  	super(props);

  	this.state = {
  		hours: []
  		// hourElement: 
  	}
  }

  buildTimeInput(day) {
    return (
      this.props.open24Hours[day] ?
        <div>
          <p className="open24">Open 24 Hours</p> <input type="checkbox" data-key={day} data-field="opens_at" onChange={this.props.set24Hours} />
        </div>
        :
        <div>
          <input type="time" defaultValue={this.props.getDayHours(day, "opens_at")} data-key={day} data-field="opens_at" onChange={this.props.handleScheduleChange}/>
          <input type="time" defaultValue={this.props.getDayHours(day, "closes_at")} data-key={day} data-field="closes_at" onChange={this.props.handleScheduleChange}/>
          <input type="checkbox" data-key={day} data-field="opens_at" onChange={this.props.set24Hours} />
        </div>
      )
  }

  render(){
  	return (
  		<div>
	    <li>
	      <p>{this.props.dayAbbrev}</p>
	      {
	        this.buildTimeInput(this.props.day)
	      }
	    </li>
	    <li>
	      <p>{this.props.dayAbbrev}</p>
	      {
	        this.buildTimeInput(this.props.day)
	      }
	    </li>
	    </div>
    )
  }
}

export default EditScheduleDay;