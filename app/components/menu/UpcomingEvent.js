import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import s from './UpcomingComponent.scss';

class UpcomingEvent extends Component {
  static propTypes = {
    backgroundImageURL: PropTypes.string.isRequired,
    eventID: PropTypes.number.isRequired,
    eventTitle: PropTypes.string.isRequired,
    eventDescription: PropTypes.string.isRequired,
    eventStartUTCUnixTimestamp: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    const { eventStartUTCUnixTimestamp } = props;
    const unixTimestamp = moment.unix(eventStartUTCUnixTimestamp);
    const remainingTime = unixTimestamp.diff(moment());

    if (unixTimestamp.isSame(moment()) || unixTimestamp.isBefore(moment())) {
      this.eventTimer = setTimeout(() => {
        this.setState({
          linkToURL: '/shows/situation-room',
        });
      }, remainingTime);
    }
  }

  state = {
    linkToURL: `/shows/event-details/${this.props.eventID}`,
  }

  componentWillUnMount() {
    clearTimeout(this.eventTimer);
  }

  render() {
    const {
      backgroundImageURL,
      eventTitle,
      eventDescription,
      eventStartUTCUnixTimestamp,
    } = this.props;

    const { linkToURL } = this.state;

    const inlineStyle = {
      backgroundImage: `url(${backgroundImageURL})`,
    };

    const eventStart = moment.unix(eventStartUTCUnixTimestamp).format('dddd MMMM D');
    const eventStartTime = `${moment.unix(eventStartUTCUnixTimestamp).format('h:mm A')} EDT`;

    return (
      <article className={s.upcomingEvent}>
        <Link
          style={inlineStyle}
          className={s.imageLink}
          to={linkToURL}
        />
        <Link className={s.upcomingEventLink} to={linkToURL}>
          <h4>{eventTitle}</h4>
        </Link>
        <time>{eventStart}</time>
        <p><time>{eventStartTime}</time></p>
        <p>{eventDescription}</p>
      </article>
    );
  }
}

export default UpcomingEvent;
