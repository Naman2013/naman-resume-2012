import React, { Component } from 'react';
import EventHero from '../../components/event-details/EventHero';
import s from './EventDetails.scss';

class EventDetails extends Component {
  render() {
    return (
      <div className={s.eventDetailsRoot}>
        <EventHero />
      </div>
    );
  }
}

export default EventDetails;
