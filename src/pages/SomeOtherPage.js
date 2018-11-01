import React, { Component } from 'react';
import queryString from 'query-string';
import _ from 'underscore';
import './App.css';
import 'eventbrite_design_system/css/eds.css';
import EVENTS from './events';
import DataTable from 'eventbrite_design_system/dataTable/DataTable';
import Button from 'eventbrite_design_system/button/Button';

import { TOKEN } from './config';

export default class SomeOtherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      token_type: '',
      user: {
        name: '',
      },
      attendees: [],
      organizers: [],
      events: EVENTS,
      all: false,
    };
  }

  handleClick = () => {
    window.location.href = 'https://www.eventbrite.com/oauth/authorize?response_type=token&client_id='+TOKEN;
  }

  componentDidMount() {
    const parsedHash = queryString.parse(window.location.hash);
    this.setState({
      ...parsedHash
    });

    if (parsedHash.access_token) {
      setTimeout(() => {
        Promise.all(EVENTS.map((event, key) => {
          return this.fetchEventAttendees(event.id, key);
        }))
          .then(() => {
            this.props.eb.FrameAPI.init();
            this.setState({
              all: true
            });
          });
      }, 0);
    }
  }

  fetchEventAttendees(event_id, key) {
    return fetch(`https://www.eventbriteapi.com/v3/events/${event_id}/attendees/?token=${this.state.access_token}`)
      .then((response) => (response.json()))
      .then((s) => {
        let {
          events
        } = this.state;
        events[key].attendees = s.attendees;

        this.setState({
          events,
        });
      });
  }

  getAllAttendees() {
    let { events } = this.state;
    let attendees = {};

    events.forEach((event) => {
      if (event.attendees) {
        event.attendees.forEach((att) => {
          if (!attendees[att.profile.email]) {
            attendees[att.profile.email] = 1;
          } else {
            attendees[att.profile.email]++;
          }
        });
      }
    });

    return _.sortBy(Object.keys(attendees).map((key) => {
      return {
        name: key,
        visits: attendees[key]
      };
    }), (obj) => obj.visits * -1);
  }

  renderDataTable(attendees) {
    if (Object.keys(attendees).length === 0) {
      return;
    }

    return (
      <DataTable
        items={attendees}
        columns={[
          {
            fieldName: 'name',
            fieldLabel: 'E-mail',
            isEditable: false,
            isSortable: true,
          },
          {
            fieldName: 'visits',
            fieldLabel: 'Visits',
            isEditable: false,
            isSortable: true,
          }
        ]}
      />
    );
  }

  render() {
    let {
      access_token
    } = this.state;

    let button = (!access_token) ? (
        <div>
          <Button style="fill" onClick={this.handleClick}>
            Authenticate
          </Button>
        </div>
      ): null;

    let attendees = this.getAllAttendees();
    let table = this.renderDataTable(attendees)

    return (
      <div className="eds-g-grid">
        <div className="eds-g-cell eds-g-cell-12-12">
          <div className="eds-align--center">
            <section className="eds-l-pad-all-4">
              <h2 className="eds-text-hl eds-text--center eds-l-pad-all-2">
                Top Fans
              </h2>
              {button}
            </section>
          </div>
          {table}
        </div>
      </div>
    );
  }
}