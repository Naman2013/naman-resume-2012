import React, { PureComponent } from 'react';
import Countdown from 'react-countdown-now';
import './index.scss';

export class ExpireCountdown extends PureComponent {
  render() {
    const { onComplete, expireTimestamp } = this.props;
    console.log(expireTimestamp);
    return (
      expireTimestamp && (
        <div className="expire-countdown">
          <Countdown date={expireTimestamp * 1000} onComplete={onComplete} />
        </div>
      )
    );
  }
}
