import React from 'react';
import classNames from 'classnames/bind';

class AddressInfo extends React.Component {
	render() {
		return (
			<div className="address">
				{buildLocation(this.props.addresses)}
			</div>
		);
	}
}

class BusinessHours extends React.Component {
	render() {
		return (
			<li className="hours">
        <i className="material-icons">schedule</i>
        <a href="" className="expand-hours">
          <div className="current-hours">
            {buildHoursText(this.props.schedule_days)}
            <i className="material-icons">expand_more</i>
          </div>
        </a>
			</li>
		);
	}
}

class PhoneNumber extends React.Component {
	render() {
		return (
			<li className="phone">
        <i className="material-icons">call</i>
				{buildPhoneNumber(this.props.phones)}
			</li>
		);
	}
}

class Languages extends React.Component {
	render() {
		return (
			<li className="lang">
        <i className="material-icons">translate</i>
				<p>English, Spanish</p>
			</li>
		);
	}
}

class Website extends React.Component {
	render() {
		return (
			<li className="website">
        <i className="material-icons">public</i>
				<p><a href="{this.props.website}" target="_blank">Website</a></p>
			</li>
		);
	}
}

function buildHoursText(schedule_days) {
	if(!schedule_days) {
		return;
	}

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
			hours = "Open Now: " + timeToString(day.opens_at) + "-" + timeToString(day.closes_at);
			if(i != days.length - 1) {
				hours += ", ";
			}
		}
	} else {
		hours = "Closed Now";
		styles.closed = true;
	}

	return (
		<p>{hours}</p>
	);
}

function buildLocation(addresses) {
	let line1 = "";
	let line2 = "";

	if(addresses && addresses.length && addresses.length > 0) {
		let address = addresses[0];

		if(address.address_1) {
			line1 += address.address_1;
		}

		if(address.address_1) {
			line1 += ", " + address.address_2;
		}

		if(address.city) {
			line2 += address.city;
		}

		if(address.state_province) {
			line2 += ", " + address.state_province;
		}

		if(address.postal_code) {
			line2 += ", " + address.postal_code;
		}
	}

	return (
		<p>
		{line1}<br />{line2}
		</p>
	);
}

function buildPhoneNumber(phones) {
	if(!phones) {
		return;
	}

	let phone = {};

	if(phones.length && phones.length > 0) {
		phone = phones[0];
	}

	return (
		<p>{phone.number}</p>
	);
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


export {AddressInfo, BusinessHours, PhoneNumber, Website, Languages};
