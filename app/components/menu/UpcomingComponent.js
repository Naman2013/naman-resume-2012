import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uniqueId from 'lodash/uniqueId';
import UpcomingEvent from './UpcomingEvent';
import s from './UpcomingComponent.scss';

const { number } = PropTypes;
export default class UpcomingComponent extends Component {
  static propTypes = {
    refreshIntervalDelay: number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      eventTitle: [],
      eventStart: [],
      eventImageURL: [],
      eventDetailsURL: [],
      eventDescription: [],
      EventMenu: [],
    };
  }

  componentDidMount() {
    this.loadUpcomingEvent();
    this.updateIntervalId = setInterval(this.loadUpcomingEvent, this.props.refreshIntervalDelay);
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalId);
  }

  loadUpcomingEvent = () => {
    axios.get(this.props.source).then(result => this.setState({ EventMenu: result.eventList }));
  };

  render() {
    const { EventMenu } = this.state;
    if (EventMenu.length <= 0) { return null; }

    return (
      <div className={s.upcomingComponentRoot}>
        <h3 className={s.title}>Upcoming Livecasts:</h3>
        {
          this.state.EventMenu.map((event) => {
            if ((event.eventStatus === 'published' || event.eventStatus === 'live') && event.eventTitle) {
              const eventImageURL = decodeURIComponent(event.eventImageURL);

              return (
                <UpcomingEvent
                  key={uniqueId()}
                  backgroundImageURL={eventImageURL}
                  eventID={event.eventId}
                  eventTitle={event.eventTitle}
                  eventDescription={event.eventDescription}
                  eventStartUTCUnixTimestamp={event.eventStart}
                />
              );
            }
            return null;
          },
        )
      }
      </div>
    );
  }
}
