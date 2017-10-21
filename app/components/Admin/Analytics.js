import React, { Component, PropTypes } from 'react';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_stats: {
        change_requests: 221,
        resources_added: 10,
        services_added: 50,
        logs_filed: 300,
        logs_approved: 21,
      },
      category_stats: [
        {
          name: 'Housing',
          services: 200,
          resources: 43,
        },
        {
          name: 'Health',
          services: 210,
          resources: 34,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        Analytics!
      </div>
    );
  }
}


export default Analytics;
