/***
  v4 Countdown Circle Timer
**/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleCounter from 'components/circle-counter';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import styles from './CountdownCircleTimer.style';

const { number, shape } = PropTypes;

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
    return new Date(new Date().setMonth(new Date().getMonth() + 1, 0)).getDate();
  }

  getDoubleNumber(number) {
    return String(number).length === 1 ? `0${number}` : number;
  }

  render() {
    const {
      props: { size, lineWidth, countdownEventTimer },
      getDaysInMonth,
      getDoubleNumber,
    } = this;

    const { daysTo, hoursTo, minutesTo, secondsTo, millisecondsTo } = countdownEventTimer;

    const daysProgress = getDaysInMonth() - daysTo;

    return (
      <div className="circle-timer">
        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={getDaysInMonth()}
          progress={daysProgress < 0 ? 1 : daysProgress}
          progressColor={astronaut}
        >
          <span className="counter-number">{getDoubleNumber(daysTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={24}
          progress={24 - hoursTo}
          progressColor={astronaut}
        >
          <span className="counter-number">{getDoubleNumber(hoursTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (minutesTo + secondsTo / 60)}
          progressColor={astronaut}
        >
          <span className="counter-number">{getDoubleNumber(minutesTo)}</span>
        </CircleCounter>

        <CircleCounter
          size={size}
          lineWidth={lineWidth}
          total={60}
          progress={60 - (secondsTo + millisecondsTo / 1000)}
          progressColor={astronaut}
        >
          <span className="counter-number">{getDoubleNumber(secondsTo)}</span>
        </CircleCounter>

        <style jsx>{styles}</style>
      </div>
    );
  }
}
