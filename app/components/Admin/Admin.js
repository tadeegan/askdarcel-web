import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from '../Loader';
import ChangeRequests from './ChangeRequests';
import * as dataService from '../../utils/DataService';
import * as changeRequestConstants from './ChangeRequestTypes';
import { getAuthRequestHeaders } from '../../utils/index';

class Admin extends Component {
  constructor() {
    super();
    this.state = { pendingStats: null };
  }

  componentDidMount() {
    // this.getChangeRequests();
    // this.getPendingServices();
    this.getPendingStats();
  }


  getPendingStats() {
    dataService.get('/api//change_requests/activity_by_timeframe?start_date=2015-06-11T11:34+01:00&end_date=2019-06-11T11:34+01:00', 
      getAuthRequestHeaders()).then((json) => {
      this.setState({
        pendingStats: json
      });
    })
    .catch((err) => {
      // console.log('wrong', err)
    });
    ;
  }

  render() {
    console.log(this.state.pendingStats);

    const { pendingStats } = this.state;

    return (!pendingStats ? <Loader /> :
      <div>
        <AdminStat name="Resource CRs" 
          total={pendingStats.new.resource_cr} 
          approved={pendingStats.approved.resource_cr} /> 

        <AdminStat name="New Resources" 
          total={pendingStats.new.new_resources} 
          approved={pendingStats.approved.new_resources} />

        <AdminStat name="Service CRs" 
          total={pendingStats.new.service_cr} 
          approved={pendingStats.approved.service_cr} />

        <AdminStat name="New Services" 
          total={pendingStats.new.new_services} 
          approved={pendingStats.approved.new_services} />
      </div>
    );
  }
}

class AdminStat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="admin-stat-pane">
        <header>{this.props.name}</header>
        {this.props.approved} approved out of {this.props.total}

        <Link to={{ pathname: '/admin/changes' }} className="org--aside--content--button edit-button">
         Review Changes
        </Link>
      </div>
    );
  }
}


export default Admin;
