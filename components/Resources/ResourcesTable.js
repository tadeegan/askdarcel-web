import React, { Component } from 'react';
import { Link } from 'react-router';
import Gmap from './Map.js';

class ResourcesTable extends Component {
	constructor() {
		super();
		this.state = {categoryName: 'Caregory Name', resources: []};
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

	getLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

	getWalkTime() {
		var self = this;
		this.getLocation(position => {
			var directionsService = new google.maps.DirectionsService();
			let myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			let destLatLang = new google.maps.LatLng('37.7749295', '-122.4194155');
			let preferences = {
				origin: myLatLng,
				destination: destLatLang,
				travelMode: google.maps.TravelMode.WALKING
			};
			directionsService.route(preferences, function(result, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		      console.log(result);
		    }
		  });
		});
	}

	componentDidMount() {
		this.loadResourcesFromServer();
		this.getWalkTime();
	}

	render() {
		return !this.state.resources.length ? <div>Loading...</div> : (
			<div className="resourcetable_main">
			  <div className="row">
					<div className="col-xs-12 col-md-5">
						<div className="resourcetable_main container-fluid">
							<div className="resourcetable_preheader row">
							  <p className="resourcetable_title col-md-10">{this.state.categoryName}</p>
							  <span className="col-md-2">{this.state.resources.length} results</span>
							</div>
							<div className="resourcetable_filter">
								<ul className="list-inline text-center">
									<li>Filter:</li>
									<li>Open Now</li>
									<li>Walking Distance</li>
									<li>Just for Me</li>
								</ul>
							</div>
							<ResourcesList resources={this.state.resources} />
						</div>
					</div>
					<div className="resourcetable_main container-fluid">
						<div className="resourcetable_map col-xs-12 col-md-7">
						  {getMapWithMarkers(this.state.resources)}
						</div>
				  </div>
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
				<ResourcesRow resource={resource} key={index} number={index + 1}/>	
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
			<div className="resourcetable_entry">
				<Link to={{ pathname: "resource", query: { id: this.props.resource.id } }}>
					<div className="row">
					  <img className="col-md-3" src="http://lorempixel.com/100/100/city/" />
					  <div className="resourcetable_general_info col-md-6">
							<div className="resourcetable_name"><p>{this.props.number}. {this.props.resource.name}</p></div>
							<div>{buildAddressCell(this.props.resource.addresses)}</div>
							<div><button>Save</button></div>
					  </div>
						<div className="resourcetable_review col-md-2"><p>{Math.floor(Math.random()*10)%6}</p></div>
				  </div>
					<div className="row resourcetable_subtext">
					  {buildHoursCell(this.props.resource.schedule.schedule_days)}
					</div>
				</Link>
			</div>
		);
	}
}

function getMapWithMarkers(resources) {
	const processAddress = (resource) => {
		if(resource) {
			let address = resource.addresses[0];
			if(!address) {
				return null;
			}
			return [+address.latitude, +address.longitude];
		}
		return null;
	};

	let markers = {
		center: processAddress(resources[0])
	};
	markers.additional = resources.slice(1).map(resource => {
		return processAddress(resource);
	});

	return <Gmap markers={markers} />;
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
		<div className="resourcetable_hours"><p>{hours}</p></div>
	);
}

function buildAddressCell(addresses) {
	let addressString = "";
	if(addresses.length && addresses.length > 0) {
		let address = addresses[0];
		addressString += address.address_1 + ", " + address.address_2;
	}

	return <div className="resourcetable_address"><p>{addressString}</p></div>
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