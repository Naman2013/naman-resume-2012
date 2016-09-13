import React, { Component } from 'react';
import Countdown from '../components/Countdown';
import Member from './Member';

export default class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="logo" />
        <div className="upcoming">
          <Countdown
            source="/api/events/upcoming?limit=50"
            duration={50000}
            updateDurationInterval={1000}
            updateEventsInterval={1000 * 60 * 5 /* 5 minutes */}
          />
        </div>
        <Member />
      </header>
    );
  }
}
