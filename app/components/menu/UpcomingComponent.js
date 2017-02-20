import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
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
      <div className={s.upcomingComponentRoot}>
        <h3 className={s.title}>Upcoming Shows:</h3>
        {
          this.state.EventMenu.map((event, i) => {
            if (event.eventStatus === 'published' && typeof event.eventTitle !== 'undefined') {
              const eventImageURL = decodeURIComponent(event.eventImageURL);
              const eventStart = moment.unix(event.eventStart).format('dddd MMMM D');
              const eventStartTime = `${moment.unix(event.eventStart).format('h:mm A')} EDT`;
              const inlineBackgroundImage = {
                backgroundImage: `url(${eventImageURL})`,
              };
              const linkURL = `/shows/event-details/${event.eventId}`;
              return (
                <article className={s.upcomingEvent} key={i}>
                  <Link
                    style={inlineBackgroundImage}
                    className={s.imageLink}
                    to={linkURL}
                  />
                  <Link className={s.upcomingEventLink} to={linkURL}>
                    <h4>{event.eventTitle}</h4>
                  </Link>
                  <time>{eventStart}</time>
                  <p><time>{eventStartTime}</time></p>
                  <p>{event.eventDescription}</p>
                </article>
              );
            }

            return null;
          }
        )
      }
      </div>
    );
  }
}
