import React, { Component } from 'react';
import { Link } from 'react-router';

// let cx = classNames.bind(styles);

class ResourcesTable extends Component {
	constructor() {
		super();
		this.state = {categoryName: 'Category Name', resources: []};
	}

	loadResourcesFromServer() {
		let { query } = this.props.location;
		let categoryid = query.categoryid;
		let url = '/api/resources?category_id=' + categoryid;
		fetch(url).then(r => r.json())
		.then(data => {
			this.setState({resources: data});
		});
	}

	componentDidMount() {
		this.loadResourcesFromServer();
	}

	render() {
		return (
			<div className="resourcetable_container">
				<div className="resourcetable_preheader"><p>Select a resource:</p></div>
				<div className="resourcetable_table">
					<div className="resourcetable_tableheader">
						<div className="resourcetable_row">
							<div className="resourcetable_cell"><p>Name</p></div>
							<div className="resourcetable_cell"><p>Rating</p></div>
							<div className="resourcetable_cell"><p>Todays hours</p></div>
							<div className="resourcetable_cell"><p>Address</p></div>
							<div className="resourcetable_cell"><p>Categories</p></div>
						</div>
					</div>
					<ResourcesList resources={this.state.resources} />
				</div>
			</div>
		);
	}
}

class ResourcesList extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		let resourcesRows = this.props.resources.map((resource, index) => {
			return (
				<ResourcesRow resource={resource} key={index}/>	
			);
		});

		return (
			<div className="resourcetable_tablebody">
				{resourcesRows}
			</div>
		);
	}
}

class ResourcesRow extends Component {
	constructor() {
		super();
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		//TODO: The Link class has a bunch of validations, etc. We should wrap that all in a service and just
		//call that.
		// Location.push("/resource/" + this.props.resource.id);
	}

	render() {
		return (
			<Link className="resourcetable_row" to={{ pathname: "resource", query: { id: this.props.resource.id } }}>
				<div className="resourcetable_cell"><p>{this.props.resource.name}</p></div>
				<div className="resourcetable_cell"><p>{Math.floor(Math.random()*10)%6}</p></div>
				{buildHoursCell(this.props.resource.schedule.schedule_days)}
				{buildAddressCell(this.props.resource.addresses)}
				<div className="resourcetable_cell"><p>{displayCategories(this.props.resource.categories)}</p></div>
			</Link>
		);
	}
}

function displayCategories(categories) {
    let categoryNames = categories.map(category => category.name);
    let categoryString = '';
    categoryNames.forEach(category => categoryString += category + ', ');

    return categoryString.substr(0, categoryString.length-2);
}

function buildHoursCell(schedule_days) {
	let hours = "";
	let styles = {
		cell: true
	};
	const currentDate = new Date();
	const currentHour = currentDate.getHours();

	const days = schedule_days.filter(schedule_day => {
		return (schedule_day && schedule_day.day == daysOfTheWeek()[currentDate.getDay()] &&
				currentHour > schedule_day.opens_at && currentHour < schedule_day.closes_at);
	});

	if(days.length && days.length > 0) {
		for(let i = 0; i < days.length; i++) {
			let day = days[i];
			hours = "open: " + timeToString(day.opens_at) + "-" + timeToString(day.closes_at);
			if(i != days.length - 1) {
				hours += ", ";
			}
		}
	} else {
		hours = "closed";
		styles.closed = true;
	}

	return (
		<div className="resourcetable_cell"><p>{hours}</p></div>
	);
}

function buildAddressCell(addresses) {
	let addressString = "";
	if(addresses.length && addresses.length > 0) {
		let address = addresses[0];
		addressString += address.address_1 + ", " + address.address_2;
	}

	return <div className="resourcetable_cell"><p>{addressString}</p></div>
}

function timeToString(hours) {
	let hoursString = "";
	if(hours < 12) {
		hoursString += hours + "am";
	} else {
		if(hours > 12) {
			hours -= 12;
		}
		
		hoursString += hours + "pm";
	}

	return hoursString;
}

function daysOfTheWeek() {
	return [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
}

export default ResourcesTable;