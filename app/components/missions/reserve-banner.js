import React, { Component, PropTypes } from 'react';
import UniversalTime from '../common/universal-time';

const ReserveBanner = (time) => {
  return (
    <div className="reserve-banner">
      <h1>Reserve Telescope</h1>
      <UniversalTime />
    </div>
  )
};

export default ReserveBanner;
