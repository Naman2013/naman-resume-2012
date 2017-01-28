import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const { number } = PropTypes;
export default class UpcomingComponent extends Component {
  state = {
    eventTitle: [],
    eventStart: [],
    eventImageURL: [],
    eventDetailsURL: [],
    eventDescription: [],
    EventMenu: [],
  };

  static propTypes = {
    refreshIntervalDelay: number.isRequired,
  }

  componentDidMount() {
    this.loadUpcomingEvent();

    this.updateIntervalId = setInterval(this.loadUpcomingEvent, this.props.refreshIntervalDelay);
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalId);
  }

  loadUpcomingEvent = () => {
    $.get(this.props.source, (result) => {
      const upcoming = result.eventList;
      const eventStart = upcoming[0].eventStart;
      const currentTime = Math.round(Date.now() / 1000);
      const diffTime = eventStart - currentTime;
      const duration = moment.duration(diffTime * 1000, 'milliseconds');

      this.setState({ EventMenu: upcoming });
    });
  };

  render() {
    return (
      <div>
        <h3>Upcoming Shows</h3>
        {this.state.EventMenu.map((event, i) => {
          if (event.eventStatus === 'published' && typeof event.eventTitle !== 'undefined') {
            const eventImageURL = decodeURIComponent(event.eventImageURL);
            const eventDetailsURL = decodeURIComponent(event.eventDetailsURL);
            const eventStart = moment.unix(event.eventStart).format('dddd MMMM D');
            const eventStartTime = `${moment.unix(event.eventStart).format('h:mm A')} EDT`;

            return (
              <article key={i}>
                <a href={eventDetailsURL}>
                  <img className="upcoming-show-preview" src={eventImageURL} />
                </a>
                <h4>{event.eventTitle}</h4>
                <time>{eventStart}</time>
                <p><time>{eventStartTime}</time></p>
                <p>{event.eventDescription}</p>
              </article>
            );
          }
        })}
      </div>
    );
  }
}
