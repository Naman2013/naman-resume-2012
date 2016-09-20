import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var moment = require('moment');
var countdown = require('moment-countdown');

export default class Countdown extends Component {
  state = {
    listtype: '',
    activeOrUpcomingEvent: undefined,
    duration: 0,
  };

  componentDidMount() {
    const {
      loadUpcomingEvent,
      props: { updateEventsInterval, updateDurationInterval },
    } = this;

    loadUpcomingEvent();

    this.updateEventsIntervalId = setInterval(loadUpcomingEvent, updateEventsInterval);

    this.durationIntervalId = setInterval(() => {
      const currentTime = Math.round(Date.now() / 1000);

      if (this.state.activeOrUpcomingEvent && typeof this.state.activeOrUpcomingEvent.eventStart !== 'undefined') {
        const diffTime = this.state.activeOrUpcomingEvent.eventStart - currentTime;
        const duration = moment.duration(diffTime * 1000, 'milliseconds');
        const parsedDuration = moment.duration(duration - updateDurationInterval, 'milliseconds');
        const readableDuration = `${parsedDuration.days()}d ${parsedDuration.hours()}h ${parsedDuration.minutes()}m ${parsedDuration.seconds()}s`;

        this.setState({
          duration: readableDuration,
        });
      };
    }, updateDurationInterval);
  }

  componentWillUnmount() {
    const {
      serverRequest,
      updateEventsIntervalId,
      durationIntervalId,
    } = this;

    serverRequest.abort();

    clearInterval(updateEventsIntervalId); // Stop interval when component is unmount.
    clearInterval(durationIntervalId);

    delete this.updateEventsIntervalId;
    delete this.durationIntervalId;
  }

  loadUpcomingEvent = () => {
    this.serverRequest = $.get(this.props.source, (result) => {
      const upcoming = result.eventList;
      const eventStart = result.eventList[0].eventStart;
      const currentTime = Math.round(Date.now() / 1000); //current system time in seconds
      const diffTime = eventStart - currentTime;
      const duration = moment.duration(diffTime*1000, 'milliseconds');

      const activeOrUpcomingEvent = upcoming.find((event) => {
        if (
          event.eventStatus === 'published' &&
          ((event.eventStart <= currentTime && currentTime <= event.eventEnd) ||
          (event.eventStart > currentTime && currentTime < event.eventEnd))
        ) {
          return event;
        }
      });

      this.setState({ activeOrUpcomingEvent });
    });
  }

  render() {
    const { activeOrUpcomingEvent, duration } = this.state;

    if (activeOrUpcomingEvent) {
      const currentTime = Math.round(Date.now() / 1000);
      const eventDetailsURL = decodeURIComponent(activeOrUpcomingEvent.eventDetailsURL);
      const eventLiveURL = decodeURIComponent(activeOrUpcomingEvent.eventLiveURL);

      if (activeOrUpcomingEvent.eventStart > currentTime && currentTime < activeOrUpcomingEvent.eventEnd) {
        return (
          <div>
            <span>Upcoming LIVE Event: </span>
              <span>
                <strong><a target="_blank" href={eventDetailsURL}>{activeOrUpcomingEvent.eventTitle}</a></strong>
                <p>
                  <span className="countdown">{duration}</span>
                  <img className="reminder-header" src="assets/images/header/reminder.png"></img>
                </p>
              </span>
          </div>
        );
      } else if (activeOrUpcomingEvent.eventStart <= currentTime && currentTime <= activeOrUpcomingEvent.eventEnd) {
        return (
          <a href={eventLiveURL}>{activeOrUpcomingEvent.eventTitle} is LIVE!</a>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
