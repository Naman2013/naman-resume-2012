import React, { Component } from 'react';
import Countdown from '../../containers/Countdown';
import Member from '../../containers/Member';
import styles from '../../styles/header.scss';

export default class header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="logo" />
        <div className="logo-text">
          Slooh <span className="beta">beta</span>
        </div>
        <div className="upcoming">
          {/* <Countdown /> */}
        </div>
        <Member />
      </header>
    );
  }
}
