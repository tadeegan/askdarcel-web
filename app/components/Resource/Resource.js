
import React, { Component } from 'react';
import {AddressInfo, BusinessHours, PhoneNumber, ResourceCategories, Website, Languages, StreetView} from './ResourceInfos';
import CommunicationBoxes from './CommunicationBoxes';
import Services from './Services';
import Loader from '../Loader';
import ResourceMap from './ResourceMap';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = { resource: null };
  }

  loadResourceFromServer() {
    let { query } = this.props.location;
    let resourceID = query.id;
    let url = 'http://localhost:3000/resources/' + resourceID;
    fetch(url).then(r => r.json())
    .then(data => {
      this.setState({resource: data.resource});
    })
    ;
  }

  componentDidMount() {
    this.loadResourceFromServer();
  }

  render() {
    return ( !this.state.resource ? <Loader /> :
      <div className="org-container">
        <article className="org">
          <div className="main-column">
            <section className="org-summary">
              <header>
                <StreetView address={this.state.resource.address} />
                <div className="org-info">
                  <h1>{this.state.resource.name}</h1>
                  <h4><ResourceCategories categories={this.state.resource.categories} /></h4>
                  <p><AddressInfo address={this.state.resource.address} /></p>
                </div>
              </header>
              <div className="rating-summary-container">
                <div className="rating-summary excellent">
                  <i className="material-icons">sentiment_very_satisfied</i>
                  <span>{Math.floor(Math.random()*10)%6}/5</span>
                </div>
                <div className="rating-summary-details">
                  <a href="#reviews">12 reviews</a>
                </div>
              </div>
              <div className="org-desc">
                <p>This is an organisation's long description{this.props.description}</p>
              </div>
              <ul className="org-details">
                <BusinessHours schedule_days={this.state.resource.schedule_days} />
                <PhoneNumber phones={this.state.resource.phones} />
                <Website website={this.state.resource.website} />
                <Languages />
              </ul>
              <div className="org-actions">
                <a href="#" className="button">Make Edits</a>
              </div>
            </section>

            <Services description={this.state.resource.long_description} services={this.state.resource.services}/>
          </div>

          <aside className="org-map">
            <div className="map-container">
              <ResourceMap name={this.state.resource.name} lat={ this.state.resource.address.latitude} long={this.state.resource.address.longitude} />
            </div>
          </aside>

        </article>
      </div>
    );
  }
}



export default Resource;
