import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './inline-countdown.scss';

class InlineCountdown extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      remainingTime: null,
    };
  }

  componentWillMount() {
    const { startTime } = this.props;

    const expires = moment( startTime * 1000 );
    const duration = expires.diff( moment() );

    this.setState({
      remainingTime: duration,
    });

    this.timer = setInterval( () => {
      const { remainingTime } = this.state;
      const { exitAction } = this.props;
      const updatedTime = moment(remainingTime).subtract({ seconds: 1 });
      const minutesRemaining = updatedTime.minutes();
      const secondsRemaining = updatedTime.seconds();

      if( minutesRemaining <= 0 && secondsRemaining <= 0 ) {
        exitAction();
      } else {
        this.setState({
          remainingTime: updatedTime,
        });
      }
    } , 1000 );
  }

  componentWillUnmount() {
    if(this.timer) {
      clearInterval( this.timer );
    }
  }

  render() {
    const { remainingTime } = this.state;
    const formattedTime = moment( remainingTime ).format( 'm:ss' );
    return(
      <div className="inline-countdown">
        { formattedTime }
      </div>
    );
  }
}

InlineCountdown.propTypes = {
  startTime: PropTypes.number, // works with unix timestamp
  exitAction: PropTypes.func, // called for you when timer expires
};

export default InlineCountdown;
