/***********************************
 * V4 Mission Snap Details
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BlueLineDrop from 'components/common/BlueLineDrop';
import styles from './UpcomingMissionAside.style';

const { arrayOf, bool, shape, string } = PropTypes;


const BootstrappedUpcomingMissionAside = ({
  title,
  telescope,
  isDesktop,
  isScreenLarge,
  hasUpcomingMissions,
  upcomingMissionArray
}) => (
  <div>
    <BlueLineDrop
      title={title}
      isDesktop={isDesktop}
      theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
      render={() => {
        let time = false;
        if (upcomingMissionArray[0] && upcomingMissionArray[0].upcomingStart) {
          time = upcomingMissionArray[0].upcomingStart
        }
        const momentTime = moment(time);
        return (
          <div className="root">
            <h5 className="title">{upcomingMissionArray[0].upcomingTitle}</h5>
            {time ? <div className="thyme-container">
              <div className="thyme">{momentTime.format('HH:mm')}<span className="utc">UTC</span>
              </div>
            </div> : null}
            <div className="bottom">
              <div className="dat">{momentTime.format('ddd. MMM. DD')}</div>
              <div className="telescope">{telescope}</div>
            </div>
        </div>
        );
      }}
    />
    <style jsx>{styles}</style>
  </div>
);

BootstrappedUpcomingMissionAside.propTypes = {
  hasUpcomingMissions: bool,
  isDesktop: bool,
  title: string,
};

BootstrappedUpcomingMissionAside.defaultProps = {
  hasUpcomingMissions: false,
  isDesktop: false,
  title: '',

};

export default BootstrappedUpcomingMissionAside;
