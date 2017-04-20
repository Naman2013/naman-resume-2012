import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircleCounter from '../components/circle-counter';
import classes from '../styles/circle-timer.scss';

const { number, bool, instanceOf, shape } = PropTypes;

export default class CircleTimer extends Component {
  static propTypes = {
    countdownEventTimer: shape({
      currentTime: number.isRequired,
      daysTo: number.isRequired,
      hoursTo: number.isRequired,
      minutesTo: number.isRequired,
      secondsTo: number.isRequired,
    }).isRequired,
    size: number,
    lineWidth: number,
  };

  getDaysInMonth() {
    return (new Date(new Date().setMonth(new Date().getMonth() + 1, 0))).getDate();
  }

  getDoubleNumber(number) {
    return String(number).length === 1 ? `0${number}` : number;
  }

  render() {
    const {
      props: {
        size,
        lineWidth,
        countdownEventTimer
      },
      getDaysInMonth,
      getDoubleNumber,
    } = this;

    const {
      daysTo,
      hoursTo,
      minutesTo,
      secondsTo,
      millisecondsTo,
    } = countdownEventTimer;

    return (
      <div className={classes.circleTimer}>
        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={getDaysInMonth()}
          progress={getDaysInMonth() - daysTo}
          progressColor="rgb(239, 34, 166)"
        >
          <span>{getDoubleNumber(daysTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={24}
          progress={24 - hoursTo}
          progressColor="rgb(241, 210, 54)"
        >
          <span>{getDoubleNumber(hoursTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (minutesTo + (secondsTo / 60))}
          progressColor="rgb(143, 144, 145)"
        >
          <span>{getDoubleNumber(minutesTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (secondsTo + (millisecondsTo / 1000))}
          progressColor="rgb(187, 219, 219)"
        >
          <span>{getDoubleNumber(secondsTo)}</span>
        </CircleCounter>

        {
          /**
            TODO: reminder features
            <img alt="Reminder icon" className="hand" src="../assets/images/header/reminder.png" />
          */
        }
      </div>
    );
  }
}
