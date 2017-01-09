import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as countDownEvents from '../modules/CountdownModule';
import CircleCounter from '../components/circle-counter';
import classes from '../styles/circle-timer.scss';


const { func, string, number } = PropTypes;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ countDownEvents }, dispatch);
}

@connect(null, mapDispatchToProps)
export default class CircleTimer extends Component {
  static propTypes = {
    size: number,
    eventStartIn: string,
    fetchActiveOrUpcomingEvent: func.isRequired,
  };

  state = {
    daysTo: 0,
    hoursTo: 0,
    minutesTo: 0,
    secondsWithMillisecondsTo: 0,
    secondsTo: 0,
  };

  componentDidMount() {
    const { props: { eventStartIn, fetchActiveOrUpcomingEvent } } = this;

    this.updateIntervalId = setInterval(() => {
      const difference = (eventStartIn * 1000) - Date.now();

      if (difference >= 0) {
        const duration = moment.duration(difference, 'milliseconds');

        this.setState({
          daysTo: duration.days(),
          hoursTo: duration.hours(),
          minutesTo: duration.minutes(),
          secondsTo: duration.seconds(),
          millisecondsTo: duration.milliseconds(),
        });
      } else {
        fetchActiveOrUpcomingEvent();
      }
    }, 1000 / 30);
  }

  componentWillUnmount() {
    window.clearInterval(this.updateIntervalId);
  }

  getDaysInMonth() {
    return (new Date(new Date().setMonth(new Date().getMonth() + 1, 0))).getDate();
  }

  getDoubleNumber(number) {
    return number.toString().length === 1 ? `0${number}` : number;
  }

  render() {
    const {
      props: { size },
      state: {
        daysTo,
        hoursTo,
        minutesTo,
        secondsTo,
        millisecondsTo,
      },
      getDaysInMonth,
      getDoubleNumber,
    } = this;

    return (
      <div className={classes.circleTimer}>
        <CircleCounter
          size={size}
          lineWidth={3}
          total={getDaysInMonth()}
          progress={getDaysInMonth() - daysTo}
          progressColor="rgb(239, 34, 166)"
        >
          <span>{getDoubleNumber(daysTo)}</span>
        </CircleCounter>
        <CircleCounter
          size={size}
          lineWidth={3}
          total={24}
          progress={24 - hoursTo}
          progressColor="rgb(241, 210, 54)"
        >
          <span>{getDoubleNumber(hoursTo)}</span>
        </CircleCounter>
        <CircleCounter
          size={size}
          lineWidth={3}
          total={60}
          progress={60 - (minutesTo + (secondsTo / 60))}
          progressColor="rgb(143, 144, 145)"
        >
          <span>{getDoubleNumber(minutesTo)}</span>
        </CircleCounter>
        <CircleCounter
          size={size}
          lineWidth={3}
          total={60}
          progress={60 - (secondsTo + (millisecondsTo / 1000))}
          progressColor="rgb(187, 219, 219)"
        >
          <span>{getDoubleNumber(secondsTo)}</span>
        </CircleCounter>
        <img src="../assets/images/header/reminder.png" />
      </div>
    );
  }
}