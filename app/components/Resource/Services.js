import React from 'react';
import classNames from 'classnames';

class Services extends React.Component {
    constructor() {
        super();
        this.renderServices.bind(this);
        this.renderServicesSection.bind(this);
    }

    renderServicesSection() {
        if(this.props.services && this.props.services.length > 0) {
            return (
              <div>
                {this.renderServices(this.props.services)}
              </div>
            );
        }
    }

    renderServices(services) {
        return services.map(service => {
            return <Service service={service} />
        });
    }

    render() {
        return (
            <div className="services-container">
              {/* <div className="innercontainer">
                    <h4>Description</h4>
                    <p>{this.props.description}</p>
                </div> */}
                {this.renderServicesSection()}
            </div>
        );
    }
}

class Service extends React.Component {
    constructor() {
        super();
        this.state = {infoHidden: true};
    }

    toggleVisible() {
        this.setState({infoHidden: !this.state.infoHidden});
    }

    render() {
        let serviceInfoContainerStyles = classNames('service-details', {hidden: this.state.infoHidden
        });

        return (
            <section className="service">
                <header className="service-header">
                  <h2>{this.props.service.name}</h2>
                </header>
                <div className={serviceInfoContainerStyles}>
                    <p className="service-description">{this.props.service.long_description}</p>
                </div>
                <div className="service-application-process-container">
                  <h5>What To Do Next</h5>
                  <p className="service-application-process">{this.props.service.application_process}
                    <Notes notes={this.props.service.notes}/>
                  </p>
                  <ul className="service-table">
                    <ServiceEligibility subject='Who can use this service' result={this.props.service.eligibility}/>
                    <ServiceEligibility subject='What documents do you need to apply' result={this.props.service.required_documents}/>
                    <ServiceEligibility subject='How much does it cost' result={this.props.service.fee}/>
                  </ul>
                </div>
            </section>
        );
    }
}

class ServiceEligibility extends React.Component {
    render() {
        return (
            <li className="service-table-row">
                <p className="service-table-cell subjectcell">{this.props.subject+':'}</p>
                <p className="service-table-cell">{this.props.result}</p>
            </li>
        );
    }
}

class Notes extends React.Component {
    render() {
        let notes = this.props.notes.map(note => {
            return <Note note={note} />
        });

        return (
            <p>{notes}</p>
        );
    }
}

class Note extends React.Component {
    render() {
        return (
            <p className="service_row">{this.props.note.note}</p>
        );
    }
}

function formatDate(dateString) {
    let date = new Date(dateString);
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear();
}

export default Services;
